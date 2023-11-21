(function (Q, $, window, undefined) {
/**
 * Streams/topic/preview tool.
 * Renders a tool to preview topic
 * @class Streams/topic/preview
 * @constructor
 * @param {Object} [options] options to pass besides the ones to Streams/preview tool
 */
Q.Tool.define("Streams/topic/preview", ["Streams/preview"], function(options, preview) {
    var tool = this;
    var $toolElement = $(tool.element);
    var state = this.state;
    tool.preview = preview;

    preview.state.imagepicker = Q.extend(preview.state.imagepicker, state.imagepicker);
    preview.state.onRefresh.add(tool.refresh.bind(tool));
    preview.state.creatable.preprocess = tool.composer.bind(tool);
    preview.state.beforeClose = function (_delete) {
        Q.confirm(tool.text.topic.AreYouSureDeleteTopic, function (result) {
            if (result){
                _delete();
            }
        });
    };


    if (preview.state.streamName) {
        $toolElement.on(Q.Pointer.fastclick, function () {
            Q.handle(state.onInvoke, tool, [tool.stream]);
        });
    }
},
{
    imagepicker: {
        showSize: "80",
        fullSize: "400",
    },
    completed: false,
    onInvoke: new Q.Event(function (stream) {
        var tool = this;
        Q.invoke({
            title: stream.fields.title,
            name: "topic",
            content: $("<div>").tool("Streams/topic", {
                publisherId: stream.fields.publisherId,
                streamName: stream.fields.name
            }),
            columnClass: 'Streams_column_topic',
            trigger: tool.element,
            onActivate: function (options, index, div, data) {
                
            }
        });
    })
},
{
    refresh: function (stream) {
        var tool = this;
        var state = this.state;
        var $toolElement = $(tool.element);
        var previewState = tool.preview.state;
        tool.stream = stream;

        stream.retain(tool);

        // this makes visible green checkpoint and progress
        // TODO: make it work
        $toolElement.attr("data-selected", state.completed);

        var fields = {
            src: stream.iconUrl(80),
            title: stream.fields.title,
            content: stream.fields.content
        };
        Q.Template.render('Streams/topic/preview', fields, function (err, html) {
            if (err) return;

            Q.replace(tool.element, html);

            tool.preview.icon($("img.Streams_topic_preview_icon", tool.element)[0]);
            $(".Streams_topic_preview_title", tool.element).tool("Streams/inplace", {
                editable: false,
                field: "title",
                inplaceType: "text",
                publisherId: previewState.publisherId,
                streamName: previewState.streamName,
            }, "topic_preview_title_" + stream.fields.name.split("/").pop())
            .activate();
            $(".Streams_topic_preview_content", tool.element).tool("Streams/inplace", {
                editable: false,
                field: "content",
                inplaceType: "text",
                publisherId: previewState.publisherId,
                streamName: previewState.streamName,
            }, "topic_preview_description_" + stream.fields.name.split("/").pop())
            .activate();

            if (stream.testWriteLevel('edit')) {
                previewState.actions.actions = previewState.actions.actions || {};
                if (!previewState.actions.actions.edit) {
                    previewState.actions.actions.edit = function () {
                        tool.update(function () {
                            stream.refresh(function () {

                            }, {
                                changed: {icon: true},
                                messages: true,
                                evenIfNotRetained: true
                            });
                        });
                    };
                }
            }
        });
    },
    /**
     * Create Topic
     * @method composer
     */
    composer: function () {
        var tool = this;
        var $toolElement = $(this.element);
        var previewState = tool.preview.state;

        $toolElement.addClass("Q_working");
        Q.req("Streams/topic", "newItem", function (err, response) {
            if (err) {
                return;
            }

            var newItem = response.slots.newItem;
            previewState.publisherId = newItem.publisherId;
            previewState.streamName = newItem.streamName;
            Q.Streams.get(previewState.publisherId, previewState.streamName, function (err) {
                if (err) {
                    return;
                }

                $toolElement.removeClass("Q_working");
                tool.stream = this;
                tool.update();
            });
        }, {
            fields: {
                publisherId: previewState.publisherId,
                category: previewState.related
            }
        });
    },
    /**
     * Update topic
     * @method update
     */
    update: function (callback) {
        var tool = this;
        var $toolElement = $(this.element);
        var isNew = $toolElement.hasClass("Streams_preview_composer");
        var previewState = this.preview.state;
        var publisherId = previewState.publisherId;
        var streamName = previewState.streamName;
        previewState.editable = true; // we need to upload icon

        // need to update tool.stream
        // actually on this stage stream should be cached, so Streams.get is just reading stream from cache, hence it can be used as synchronous
        Q.Streams.get(publisherId, streamName, function () {
            tool.stream = this;
        });

        Q.Dialogs.push({
            title: isNew ? tool.text.topic.NewTopic : tool.text.topic.UpdateTopic,
            className: "Streams_topic_preview_composer",
            template: {
                name: "Streams/topic/composer",
                fields: {
                    title: Q.getObject("stream.fields.title", tool) || "",
                    content: Q.getObject("stream.fields.content", tool) || "",
                    saveButtonText: isNew ? tool.text.topic.CreateTopic : tool.text.topic.UpdateTopic
                }
            },
            onActivate: function ($dialog) {
                var $icon = $("img.Streams_topic_preview_icon", $dialog);
                var $save = $("button[name=save]", $dialog);

                // apply Streams/preview icon behavior
                $("<div>").tool("Streams/preview", {
                    publisherId: tool.stream.fields.publisherId,
                    streamName: tool.stream.fields.name
                }).activate(function () {
                    this.icon($icon[0], null, {
                        overrideShowSize: {
                            "": "400.png"
                        }
                    });
                });

                // create topic
                $save.on(Q.Pointer.fastclick, function (event) {
                    event.preventDefault();
                    $save.addClass("Q_working");

                    var pipe = new Q.pipe(["save", "unrelate", "relate"], function () {
                        var relatedTool = Q.Tool.from($toolElement.closest(".Streams_related_tool"), "Streams/related");
                        if (relatedTool) {
                            relatedTool.refresh();
                        }
                        Q.handle(callback);
                        $save.removeClass("Q_working");
                        Q.Dialogs.pop();
                    });
                    tool.stream.set('title', $("input[name=title]", $dialog).val());
                    tool.stream.set('content', $("textarea[name=description]", $dialog).val());
                    tool.stream.save({
                        onSave: pipe.fill("save")
                    });

                    if (isNew) {
                        tool.stream.unrelateFrom(previewState.related.publisherId, previewState.related.streamName, "new", pipe.fill("unrelate"));
                        tool.stream.relateTo(previewState.related.type, previewState.related.publisherId, previewState.related.streamName, pipe.fill("relate"));
                    } else {
                        pipe.fill("unrelate")();
                        pipe.fill("relate")();
                    }
                });
            }
        });
    }
});

Q.Template.set('Streams/topic/preview',
    `<div class="Streams_topic_preview_icon"><img class="Streams_topic_preview_icon"></div>
    	<div class="Streams_topic_preview_title"></div>
    	<div class="Streams_topic_preview_content"></div>
    	<div class="Streams_topic_right">
    		<div class="Streams_topic_check"></div>
    		<div class="Streams_topic_amount">1/30</div>
    	</div>`
);

Q.Template.set('Streams/topic/composer',
`<form class="Streams_topic_composer">
        <div class="Streams_topic_composer_form_group">
            <input type="text" name="title" value="{{title}}" class="Streams_topic_composer_form_control" placeholder="{{topic.TitlePlaceholder}}">
        </div>
        <div class="Streams_topic_composer_form_group">
            <textarea name="description" class="Streams_topic_composer_form_control" placeholder="{{topic.DescribeTopic}}">{{content}}</textarea>
        </div>
        <div class="Streams_topic_composer_form_group" data-type="icon">
            <div class="Streams_topic_composer_container">
                <img class="Streams_topic_preview_icon">
            </div>
            <label>{{topic.TopicIcon}}</label>
        </div>
        <button class="Q_button" name="save" type="button">{{saveButtonText}}</button>
    </form>`, {text: ['Streams/content']});

})(Q, Q.jQuery, window);