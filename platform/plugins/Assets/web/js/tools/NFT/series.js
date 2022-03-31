(function (window, Q, $, undefined) {
    /**
     * @module Assets
     */

    var Assets = Q.Assets;
    var NFT = Assets.NFT;
    var Web3 = NFT.Web3;

    /**
     * YUIDoc description goes here
     * @class Assets NFT/series
     * @constructor
     * @param {Object} [options] Override various options for this tool
     *  @param {string} userId - owner user id
     *  @param {string} chainId - chain id
     *  @param {string} seriesId
     *  @param {boolean} [composer=false] - If true build composer.
     *  @param {Q.Event} [options.onInvoke] Event occur when user click on tool element.
     *  @param {Q.Event} [options.onAvatar] Event occur when click on Users/avatar tool inside tool element.
     *  @param {Q.Event} [options.onCreated] Event occur when series created.
     */
    Q.Tool.define("Assets/NFT/series/preview", ["Streams/preview"],function(options, preview) {
        var tool = this;
        var state = tool.state;
        var $toolElement = $(this.element);
        tool.preview = preview;
        var previewState = tool.preview.state;
        var loggedInUserId = Q.Users.loggedInUserId();

        // is admin
        var roles = Object.keys(Q.getObject("roles", Q.Users) || {});
        tool.isAdmin = (roles.includes('Users/owners') || roles.includes('Users/admins'));

        if (Q.isEmpty(state.chainId)) {
            return console.warn("chain id required!");
        }
        if (Q.isEmpty(state.seriesId)) {
            return console.warn("seriesId required!");
        }
        if (Q.isEmpty(state.contract)) {
            return console.warn("contract address required!");
        }

        // remove trailing zeros
        state.seriesId = state.seriesId.replace(/0+$/, '');

        state.chain = NFT.chains[state.chainId];

        // <set Streams/preview imagepicker settings>
        previewState.imagepicker.showSize = state.imagepicker.showSize;
        previewState.imagepicker.fullSize = state.imagepicker.fullSize;
        previewState.imagepicker.save = state.imagepicker.save;
        // </set Streams/preview imagepicker settings>

        var pipe = Q.pipe(["stylesheet", "text"], function (params, subjects) {
            if (previewState.streamName) {
                $toolElement.attr("data-publisherId", previewState.publisherId);
                $toolElement.attr("data-streamName", previewState.streamName);
                $toolElement.attr("data-chainId", state.chainId);

                previewState.onRefresh.add(tool.refresh.bind(tool), tool);
            } else {
                if ((loggedInUserId && state.userId === loggedInUserId) || tool.isAdmin) {
                    previewState.onComposer.add(tool.composer.bind(tool), tool);
                } else {
                    Q.Tool.remove(tool.element, true, true);
                }
            }
        });

        Q.addStylesheet("{{Assets}}/css/tools/NFT/series.css", pipe.fill('stylesheet'), { slotName: 'Assets' });
        Q.Text.get('Assets/content', function(err, text) {
            tool.text = text;
            pipe.fill('text')();
        }, {
            ignoreCache: true
        });
    },

    { // default options here
        seriesId: null,
        userId: null,
        contract: null,
        chainId: null,
        onMarketPlace: true,
        imagepicker: {
            showSize: "200.png",
            save: "Streams/image"
        },
        onInvoke: new Q.Event(),
        onAvatar: new Q.Event(),
        onCreated: new Q.Event()
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
            var authorUserId = stream.getAttribute("authorId") || stream.fields.publisherId;
            var untilTime = stream.getAttribute("untilTime");

            Q.Template.render('Assets/NFT/series/view', {
                price: stream.getAttribute("price"),
                currency: stream.getAttribute("currency"),
                untilTime: untilTime
            }, (err, html) => {
                tool.element.innerHTML = html;

                $toolElement.activate();

                $(".Assets_NFT_avatar", tool.element).tool("Users/avatar", {
                    userId: authorUserId,
                    icon: 40,
                    contents: true,
                    editable: false
                }).activate(function () {
                    $(this.element).on(Q.Pointer.fastclick, function (e) {
                        Q.handle(state.onAvatar, this, [e]);
                    });
                });

                //var $icon = $("img.NFT_series_icon", tool.element);
                //tool.preview.icon($icon[0]);

                // handle with days, hours, minutes visibility
                $("[data-timestamp]", tool.element).each(function () {
                    var $this = $(this);
                    $this.tool("Q/countdown", {
                        onRefresh: function () {
                            var $currentElement = $(this.element);
                            $(".Q_days:visible, .Q_hours:visible, .Q_minutes:visible, .Q_seconds:visible", $currentElement).each(function () {
                                var $this = $(this);
                                if (($this.hasClass("Q_days") || $this.hasClass("Q_hours") || $this.hasClass("Q_minutes")) && $this.text() === "0") {
                                    var $parent = $this.parent();
                                    var $prevSpan = $parent.prev("span:visible");
                                    if (!$prevSpan.length) {
                                        $parent.hide();
                                    }
                                }

                                Q.each(["day", "hour", "minute"], function(i, val) {
                                    if (val === 'day') {
                                        if ($this.hasClass("Q_" +val + "s") && $this.text() === "1") {
                                            $this.next("." + val + "sText").text(tool.text.NFT[val.toCapitalized()]);
                                        } else {
                                            $this.next("." + val + "sText").text(tool.text.NFT[(val + "s").toCapitalized()]);
                                        }
                                    } else {
                                        $this.next("." + val + "sText").text(':');
                                    }

                                });
                            });
                        }
                    }).activate();
                });

                // set onInvoke event
                $toolElement.off(Q.Pointer.fastclick).on(Q.Pointer.fastclick, function () {
                    Q.handle(state.onInvoke, tool, [stream]);
                });
            });
        },
        /**
         * Create NFT
         * @method composer
         */
        composer: function () {
            var tool = this;
            var state = tool.state;
            var $toolElement = $(this.element);
            var previewState = tool.preview.state;
            var userId = state.userId;
            var relatedTool = Q.Tool.from($toolElement.closest(".Streams_related_tool")[0], "Streams/related");

            $toolElement.addClass("Assets_NFT_series_new");

            var currencies = NFT.currencies.map(function (item) {
                return item[state.chainId] ? item.symbol : false;
            }).filter(function (item) { return item});

            var _openDialog = function () {
                Q.Dialogs.push({
                    title: tool.text.NFT.CreateSeries,
                    className: "Assets_NFT_series_composer",
                    template: {
                        name: "Assets/NFT/series/Create",
                        fields: {
                            isAdmin: tool.isAdmin,
                            currencies: currencies,
                            onMarketPlace: state.onMarketPlace,
                            baseUrl: Q.baseUrl()
                        }
                    },
                    onActivate: function (dialog) {
                        //var $icon = $("img.NFT_series_icon", dialog);

                        // apply Streams/preview icon behavior
                        //tool.preview.icon($icon[0]);

                        // upload image button
                        //$(".Assets_nft_upload_button", dialog).on(Q.Pointer.fastclick, function (event) {
                        //    event.preventDefault();
                        //    $icon.trigger("click");
                        //});

                        // switch onMarketPlace
                        var $onMarketPlace = $(".Assets_nft_check", dialog);
                        $onMarketPlace.click(function() {
                            var checked = $onMarketPlace.prop('checked');
                            var $assetsNFTformDetails = $(".Assets_nft_form_details", dialog);
                            if (checked) {
                                $assetsNFTformDetails.removeClass("Q_disabled");
                            } else {
                                $assetsNFTformDetails.addClass("Q_disabled");
                            }
                        });

                        // get a stream by data got from "newItem" request
                        Q.Streams.get.force(previewState.publisherId, previewState.streamName, function () {
                            tool.stream = this;

                            this.onFieldChanged("icon").set(function (modFields, field) {
                                //modFields[field]
                                /*this.refresh(function () {
                                    tool.preview.icon($icon[0]);
                                }, {
                                    evenIfNotRetained: true
                                });*/
                            }, tool);
                        });

                        // create NFT
                        $("button[name=save]", dialog).on(Q.Pointer.fastclick, function (event) {
                            event.preventDefault();

                            $(dialog).addClass("Q_disabled");

                            var untilTime = $("input[name=untilTime]", dialog).val();
                            if (untilTime) {
                                untilTime = Date.parse(untilTime)/1000;
                            }

                            var price = parseFloat($("input[name=price]:visible", dialog).val()) || 0;
                            var onMarketPlace = $onMarketPlace.prop("checked");
                            var currencySymbol = $("select[name=currency]", dialog).val();
                            var currency = {};
                            Q.each(NFT.currencies, function (i, c) {
                                if (c.symbol !== currencySymbol) {
                                    return;
                                }

                                currency = c;
                                currency.token = c[state.chainId];
                            });

                            var attributes = {
                                onMarketPlace: onMarketPlace,
                                currency: currencySymbol,
                                seriesId: state.seriesId,
                                price: price,
                                untilTime: untilTime
                            };

                            // activate series in blockchain
                            try {
                                Q.Assets.NFT.Web3.setSeriesInfo(state.chainId, state.seriesId, {
                                    price:price,
                                    currency: currency.token
                                }, function () {
                                    Q.req("Assets/NFTseries",function (err) {
                                        Q.Dialogs.pop();

                                        Q.Streams.get.force(tool.stream.fields.publisherId, tool.stream.fields.name, function () {
                                            $toolElement.removeClass("Q_working");
                                            tool.refresh(this);
                                        });

                                        // update related tool if exists
                                        //relatedTool && relatedTool.loadMore();
                                        Q.handle(state.onCreated, tool, [previewState.publisherId, previewState.streamName]);
                                    }, {
                                        method: "post",
                                        fields: {
                                            userId: userId,
                                            chainId: state.chainId,
                                            attributes: attributes
                                        }
                                    });
                                });
                            } catch (e) {
                                console.error(e);
                                $toolElement.removeClass("Q_working");
                                $(dialog).removeClass("Q_disabled");
                            }
                        });
                    },
                    onClose: function () {
                        $toolElement.removeClass("Q_working");
                    }
                });
            };

            Q.Template.render('Assets/NFT/series/newItem', {}, function(err, html) {
                tool.element.innerHTML = html;
                $toolElement.off("click.NFTcomposer").on("click.NFTcomposer", function () {
                    $toolElement.addClass("Q_working");

                    Q.req("Assets/NFTseries", "newItem", function (err, response) {
                        if (err) {
                            return $toolElement.removeClass("Q_working");
                        }

                        var newItem = response.slots.newItem;
                        previewState.publisherId = newItem.publisherId;
                        previewState.streamName = newItem.streamName;

                        // this need for Streams/related tool to avoid appear composer twice
                        Q.setObject("options.streams_preview.publisherId", newItem.publisherId, tool.element);
                        Q.setObject("options.streams_preview.streamName", newItem.streamName, tool.element);

                        _openDialog();
                    }, {
                        fields: {
                            userId: userId,
                            chainId: state.chainId
                        }
                    });
                });
            });
        }
    });

    Q.Template.set('Assets/NFT/series/newItem',
`<div class="tile-block">
            <h2 class="tile-name">{{NFT.series.NewItem}}</h2>
        </div>`,
        {text: ['Assets/content']}
    );

    Q.Template.set('Assets/NFT/series/Create',
`<form>
        <div class="Assets_nft_form_group">
            <div class="Assets_nft_market">
                <div>
                    <label>{{NFT.series.OnSale}} :</label>
                </div>
                <label class="switch">
                    <input type="checkbox" {{#if onMarketPlace}}checked{{/if}} class="Assets_nft_check">
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="Assets_nft_form_details" data-active="{{onMarketPlace}}">
                <div class="Assets_nft_form_price">
                    <label>{{NFT.Price}}</label>
                    <input type="text" name="price" class="Assets_nft_form_control" placeholder="{{NFT.EnterPrice}}" value="{{price}}">
                    <select name="currency">
                        {{#each currencies}}
                            <option>{{this}}</option>
                        {{/each}}
                    </select>
                </div>
                <div class="Assets_nft_form_date">
                    <label>{{NFT.ExpirationDate}}</label>
                    <input type="datetime-local" name="untilTime">
                </div>
            </div>
        </div>
        <button class="Q_button" name="save">{{NFT.Create}}</button>
    </form>`, {text: ['Assets/content']});

    Q.Template.set('Assets/NFT/series/view',
        `<div class="tile-block">
        <ul class="bid-info">
            <li class="Assets_NFT_price"><span class="Assets_NFT_price_value">{{price}}</span> {{currency}}</li>
            {{#if untilTime}}
                <li>
                    <span>{{NFT.series.EndingIn}}</span>
                </li>
                <li class="Assets_NFT_series_untilTime" data-timestamp="{{untilTime}}">
                    <span class="dateDays"><span class="Q_days"></span> <span class="daysText">{{NFT.Days}}</span></span>
                    <span class="dateHours"><span class="Q_hours"></span> :</span>
                    <span class="dateMinutes"><span class="Q_minutes"></span> :</span>
                    <span class="dateSeconds"><span class="Q_seconds"></span></span>
                </li>
            {{/if}}
        </ul>
    </div>`,
        {text: ['Assets/content']}
    );
})(window, Q, jQuery);