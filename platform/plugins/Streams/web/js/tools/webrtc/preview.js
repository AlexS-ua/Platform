(function (Q, $, window, undefined) {

    /**
     * Streams/webrtc/preview tool.
     * Renders a tool to preview Streams/webrtc
     * @class Streams/webrtc/preview
     * @constructor
     * @param {Object} [options] options to pass besides the ones to Streams/preview tool
	 * @param {Q.Event} [options.onWebRTCRoomCreated]
	 * @param {Q.Event} [options.onWebrtcControlsCreated]
	 * @param {Q.Event} [options.onWebRTCRoomEnded]
	 */
    Q.Tool.define("Streams/webrtc/preview", ["Streams/preview"], function _Streams_webrtc_preview (options, preview) {
            var tool = this;
            var state = this.state;
            tool.preview = preview;
			
			preview.state.editable = state.editable;

            //preview.state.creatable.preprocess = tool.composer.bind(this);

            Q.addStylesheet('{{Streams}}/css/tools/previews.css', { slotName: 'Streams' });

            Q.Text.get('Streams/content', function (err, text) {
                var msg = Q.firstErrorMessage(err);
                if (msg) {
                    return console.warn(msg);
                }

                tool.text = text;
                preview.state.onRefresh.add(tool.refresh.bind(tool));
            });
        },

{
			editable: false,
			templates: {
				view: {
					name: 'Streams/webrtc/preview/view',
					fields: { alt: 'icon', titleClass: '', titleTag: 'h3' }
				}
			},
			onWebRTCRoomCreated: new Q.Event(),
			onWebrtcControlsCreated: new Q.Event(),
			onWebRTCRoomEnded: new Q.Event()
		},

{
        refresh: function (stream) {
            var tool = this;
            var state = this.state;
            var $toolElement = $(tool.element);

            if (!Q.Streams.isStream(stream)) {
                return;
            }

            tool.stream = stream;

            // retain with stream
            Q.Streams.retainWith(tool).get(stream.fields.publisherId, stream.fields.name);

            var preamble = Q.getObject('webtc.preview.Meeting', tool.text) || 'Meeting';
            var duration = "";
            if (stream.getAttribute("endTime")) {
            	var durationArr = Q.displayDuration(parseInt(stream.getAttribute("endTime")) - parseInt(stream.getAttribute("startTime"))).split(":");
				for (var i=durationArr.length-1; i>=0; i--) {
					duration = durationArr[i] + " " + (["sec", "min", "h"][durationArr.length - (i + 1)]) + " " + duration;
				}
				preamble = Q.getObject('webtc.preview.MeetingEnded', tool.text) || 'Meeting ended';
			}

			var fields = Q.extend({}, state.templates.view.fields, {
				publisherId: stream.fields.publisherId,
				streamName: stream.fields.name,
				alt: 'icon',
				title: stream.fields.title,
				content: stream.fields.content,
				duration: duration,
				preamble: preamble
			});
			Q.Template.render(
				'Streams/webrtc/preview/view',
				fields,
				function (err, html) {
					if (err) return;
					tool.element.innerHTML = html;
					Q.activate(tool, function () {
						// load the icon
						// TODO: make this use flexbox instead
						var jq = tool.$('img.Streams_preview_icon');
						tool.preview.icon(jq[0], null);
						var $pc = tool.$('.Streams_preview_contents');
						if ($pc.parent().is(":visible")) {
							$pc.width(0).width($pc[0].remainingWidth());
						}
						Q.onLayout(tool.element).set(function () {
							var $pc = tool.$('.Streams_preview_contents');
							if ($pc.parent().is(':visible')) {
								$pc.width(0).width($pc[0].remainingWidth());	
							}
						}, tool);
						Q.handle(state.onRender, tool);
					});
				},
				state.templates.view
			);

            $toolElement.on(Q.Pointer.fastclick, function () {
                var WebConference = Q.Streams.WebRTC();
                WebConference.start({
                    element: document.body,
                    roomId: stream.fields.name.split('/').pop(),
                    roomPublisherId: stream.fields.publisherId,
                    mode: 'node',
                    startWith: {video: false, audio: true},
                    onWebRTCRoomCreated: function() {
                        console.log('onWebRTCRoomCreated', this);
                        Q.handle(state.onWebRTCRoomCreated, tool, [WebConference]);
                    },
                    onWebrtcControlsCreated: function() {
                        console.log('onWebrtcControlsCreated', this);
						Q.handle(state.onWebrtcControlsCreated, tool, [WebConference]);
                    },
					onWebRTCRoomEnded: function () {
						console.log('onWebRTCRoomEnded', this);
						Q.handle(state.onWebRTCRoomEnded, tool, [WebConference]);
					}
                });
            });
        }
    });
	
Q.Template.set('Streams/webrtc/preview/view',
	'<div class="Streams_preview_container Streams_preview_view Q_clearfix">'
	+ '<img alt="{{alt}}" class="Streams_preview_icon">'
	+ '<div class="Streams_preview_contents {{titleClass}}">'
	+ '<{{titleTag}} class="Streams_preview_preamble">{{preamble}} <span class="Streams_webrtc_duration">{{duration}}</span></{{titleTag}}>'
	+ '<{{titleTag}} class="Streams_preview_title">{{title}}</{{titleTag}}>'
	+ '<div class="Streams_preview_content">{{content}}</div>'
	+ '{{&tool "Streams/participants" "" publisherId=publisherId streamName=streamName maxShow=10 invite=false hideIfNoParticipants=true}}'
	+ '</div></div>'
);

})(Q, Q.$, window);