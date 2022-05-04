(function (window, Q, $, undefined) {
    /**
     * @module Assets
     */

    var Users = Q.Users;
    var Assets = Q.Assets;
    var NFT = Assets.NFT;
    var Web3 = NFT.Web3;

    /**
     * YUIDoc description goes here
     * @class Assets NFT/series
     * @constructor
     * @param {Object} [options] Override various options for this tool
     *  @param {string} userId - owner user id
     *  @param {Q.Event} [options.onInvoke] Event occur when user click on tool element.
     *  @param {Q.Event} [options.onAvatar] Event occur when click on Users/avatar tool inside tool element.
     *  @param {Q.Event} [options.onCreated] Event occur when series created.
     *  @param {Q.Event} [options.onIconChanged] Event occur when icon changed.
     */
    Q.Tool.define("Assets/NFT/series/preview", ["Streams/preview"],function(options, preview) {
        var tool = this;
        var state = tool.state;
        var $toolElement = $(this.element);
        tool.preview = preview;
        var previewState = tool.preview.state;

        // is admin
        var roles = Object.keys(Q.getObject("roles", Users) || {});
        tool.isAdmin = (roles.includes('Users/owners') || roles.includes('Users/admins'));

        if (Q.isEmpty(state.userId)) {
            return console.warn("user id required!");
        }

        // <set Streams/preview imagepicker settings>
        previewState.imagepicker.showSize = state.imagepicker.showSize;
        //previewState.imagepicker.fullSize = state.imagepicker.fullSize;
        previewState.imagepicker.save = state.imagepicker.save;
        // </set Streams/preview imagepicker settings>

        var pipe = Q.pipe(["stylesheet", "text"], function (params, subjects) {
            if (previewState.streamName) {
                $toolElement.attr("data-publisherId", previewState.publisherId);
                $toolElement.attr("data-streamName", previewState.streamName);

                previewState.onRefresh.add(tool.refresh.bind(tool), tool);
            } else {
                previewState.onComposer.add(tool.composer.bind(tool), tool);
            }
        });

        Q.addStylesheet("{{Assets}}/css/tools/NFT/seriesPreview.css", pipe.fill('stylesheet'), { slotName: 'Assets' });
        Q.Text.get('Assets/content', function(err, text) {
            tool.text = text;
            pipe.fill('text')();
        }, {
            ignoreCache: true
        });
    },

    { // default options here
        userId: null,
        imagepicker: {
            showSize: "300x.png",
            save: "NFT/series/icon"
        },
        onInvoke: new Q.Event(),
        onAvatar: new Q.Event(),
        onCreated: new Q.Event(),
        onIconChanged: new Q.Event()
    },

    {
        /**
         * Refreshes the appearance of the tool completely
         * @method refresh
         * @param {Streams_Stream} stream
         */
        refresh: function (stream) {
            var tool = this;
            var state = tool.state;
            var $toolElement = $(this.element);

            var seriesId = stream.getAttribute("seriesId");
            $toolElement.attr("data-seriesid", seriesId);

            Q.Template.render('Assets/NFT/series/view', {
                name: stream.fields.title || ""
            }, (err, html) => {
                tool.element.innerHTML = html;

                $(".Assets_NFT_series_avatar", tool.element).tool("Users/avatar", {
                    userId: stream.fields.publisherId,
                    icon: 40,
                    contents: false,
                    editable: false
                }).activate(function () {
                    $(this.element).on(Q.Pointer.fastclick, function (e) {
                        Q.handle(state.onAvatar, this, [e]);
                    });
                });

                //var $icon = $("img.NFT_series_icon", tool.element);
                //tool.preview.icon($icon[0]);

                // set onInvoke event
                $toolElement.off(Q.Pointer.fastclick).on(Q.Pointer.fastclick, function () {
                    tool.update(stream);
                    Q.handle(state.onInvoke, tool, [stream]);
                });
            });
        },
        /**
         * Create series
         * @method composer
         */
        composer: function () {
            var tool = this;
            var state = tool.state;
            var $toolElement = $(this.element);
            var previewState = tool.preview.state;

            $toolElement.addClass("Assets_NFT_series_new");

            Q.Template.render('Assets/NFT/series/newItem', {
                iconUrl: Q.url("{{Q}}/img/actions/add.png")
            }, function(err, html) {
                tool.element.innerHTML = html;
                $toolElement.off("click.nftSeriesComposer").on("click.nftSeriesComposer", function () {

                    Q.req("Assets/NFTseries", "newItem", function (err, response) {
                        if (err) {
                            return;
                        }

                        var newItem = response.slots.newItem;
                        previewState.publisherId = newItem.publisherId;
                        previewState.streamName = newItem.streamName;

                        // this need for Streams/related tool to avoid appear composer twice
                        Q.setObject("options.streams_preview.publisherId", newItem.publisherId, tool.element);
                        Q.setObject("options.streams_preview.streamName", newItem.streamName, tool.element);

                        // get a stream by data got from "newItem" request
                        Q.Streams.get.force(previewState.publisherId, previewState.streamName, function (err) {
                            if (err) {
                                return;
                            }

                            tool.update(this);
                        });
                    }, {
                        fields: {
                            userId: state.userId
                        }
                    });
                });
            });
        },
        /**
         * Update series
         * @method update
         */
        update: function (stream) {
            var tool = this;
            var $toolElement = $(this.element);
            var state = this.state;
            var isNew = !stream.fields.title;

            stream.onFieldChanged("icon").set(function (modFields, field) {
                Q.handle(state.onIconChanged, tool);
            }, tool);

            Q.Dialogs.push({
                title: isNew ? tool.text.NFT.series.CreateSeries : tool.text.NFT.series.UpdateSeries,
                className: "Assets_NFT_series_composer",
                template: {
                    name: "Assets/NFT/series/Create",
                    fields: {
                        name: stream.fields.title,
                        buttonText: isNew ? tool.text.NFT.Create : tool.text.NFT.Update
                    }
                },
                onActivate: function (dialog) {
                    var $icon = $("img.NFT_series_icon", dialog);

                    var overrides = NFT.icon.defaultSize ? {
                        "overrideShowSize": {
                            '': (state.imagepicker.showSize || NFT.series.icon.defaultSize)
                        }
                    } : {};

                    // apply Streams/preview icon behavior
                    tool.preview.icon($icon[0], null, overrides);

                    // upload image button
                    $("button[name=upload_icon]", dialog).on(Q.Pointer.fastclick, function (event) {
                        event.preventDefault();
                        $icon.trigger("click");
                    });

                    $(".series_name_inplace", dialog).tool("Streams/inplace", {
                        publisherId: stream.fields.publisherId,
                        streamName: stream.fields.name,
                        field: 'title',
                        inplaceType: "text"
                    }).activate();

                    $("button[name=save]", dialog).on(Q.Pointer.fastclick, function (event) {
                        event.preventDefault();

                        Q.Dialogs.pop();

                        Q.req("Assets/NFTseries",function (err) {
                            if (err) {
                                return;
                            }

                            var relatedTool = Q.Tool.from($toolElement.closest(".Streams_related_tool")[0], "Streams/related");
                            if (relatedTool) {
                                relatedTool.refresh();
                            }

                            /*Q.Streams.get.force(stream.fields.publisherId, stream.fields.name, function () {
                                Q.Dialogs.pop();
                                $toolElement.removeClass("Assets_NFT_series_new");

                                tool.refresh(this);

                                $("<div>").insertAfter($toolElement).tool("Streams/preview", {
                                    publisherId: state.userId
                                }).tool("Assets/NFT/series/preview", {
                                    userId: state.userId
                                }).activate();
                            });*/

                            Q.handle(state.onCreated, tool, [stream.fields.publisherId, stream.fields.name]);
                        }, {
                            method: "post",
                            fields: {
                                publisherId: stream.fields.publisherId,
                                streamName: stream.fields.name
                            }
                        });

                        return false;
                    });
                }
            });
        }
    });

    Q.Template.set('Assets/NFT/series/newItem',
        `<img src="{{iconUrl}}" alt="new" class="Streams_preview_add">
        <h3 class="Streams_preview_title">{{NFT.series.NewItem}}</h3>`, {text: ['Assets/content']}
    );

    Q.Template.set('Assets/NFT/series/Create',
`<div class="Assets_nft_form_group Assets_nft_series_name">
            <label>{{NFT.Name}}:</label>
            <div class="series_name_inplace"></div>
        </div>
        <div class="Assets_nft_form_group Assets_nft_series_icon">
            <label>{{NFT.series.CoverImage}}:</label>
            <div class="Assets_nft_form_details">
                <img class="NFT_series_icon">
                <button name="upload_icon">{{NFT.series.UploadCoverImage}}</button>
            </div>
        </div>
        <button class="Q_button" name="save">{{buttonText}}</button>
        `, {text: ['Assets/content']});

    Q.Template.set('Assets/NFT/series/view',
`<div class="Assets_NFT_series_avatar"></div>
        <div class="Assets_NFT_series_info">
            <div class="Assets_NFT_series_name">{{name}}</div>
        </div>`,
        {text: ['Assets/content']}
    );
})(window, Q, jQuery);