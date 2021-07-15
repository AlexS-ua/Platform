(function (Q, $, window, undefined) {

var Streams = Q.Streams;
var Users = Q.Users;

/**
 * @module Streams-tools
 */

/**
 * Renders an interface to handle Streams/calls
 * @class Streams calls
 * @constructor
 * @param {Object} [options] any options for the tool
 * @param {Q.Event} [options.maxCalls=0] Max calls can be related to this category
 * @param {Q.Event} [options.publisherId=Users.currentCommunityId] Publisher of Streams/calls/main stream
 * @param {Q.Event} [options.streamName=Streams/calls/main] Category stream name
 */
Q.Tool.define("Streams/calls", function(options) {
	var tool = this;
	var state = this.state;

	console.log('caaaals', state)
	var pipe = new Q.pipe(["style", "text", "stream"], function () {
		if (tool.stream.testWriteLevel("edit")) {
			state.isAdmin = true;
			tool.settings();
		} else {
			tool.call();
		}
	});

	Streams.get.force(state.publisherId, state.streamName, function (err) {
		var msg = Q.firstErrorMessage(err);
		if (msg) {
			return Q.alert(msg);
		}

		// join every user to allow get messages
		this.join();

		tool.stream = this;

		// check availability and also listen messages Streams/relation/[available, unavailable]
		var calls = Q.getObject(["relatedToTotals", state.relationType, "Streams/webrtc"], this) || 0;
		var maxCalls = tool.getMaxCalls();
		tool.available(calls < maxCalls);
		this.onMessage("Streams/relation/available").set(function (stream, message) {
			tool.available(true);
		}, tool);
		this.onMessage("Streams/relation/unavailable").set(function (stream, message) {
			tool.available(false);
		}, tool);

		pipe.fill("stream")();
	}, {
		withRelatedToTotals: [state.relationType]
	});

	Q.Text.get("Streams/content", function (err, content) {
		if (err) {
			return;
		}

		tool.text = content;
		pipe.fill("text")();
	});
	Q.addStylesheet('{{Streams}}/css/tools/calls.css', { slotName: 'Streams' }, pipe.fill("style"));
},

{
	maxCalls: 0,
	publisherId: Users.currentCommunityId,
	streamName: "Streams/calls/main",
	relationType: "Streams/calls"
},

{
	/**
	 * Set tool status to available/unavailable
	 * @method available
	 * @params {boolean} state
	 */
	available: function (state) {
		var $toolElement = $(this.element);

		// available/unavailable only for regular users
		if (this.stream.testWriteLevel("edit")) {
			return;
		}

		if (state) {
			$toolElement.removeClass("Q_disabled_2");
			$toolElement.addClass("Q_pulsate");
		} else {
			$toolElement.addClass("Q_disabled_2");
			$toolElement.removeClass("Q_pulsate");
		}
	},
	/**
	 * Get current max calls from stream attributes
	 * @method getMaxCalls
	 * @params {boolean} state
	 */
	getMaxCalls: function () {
		return Q.getObject(this.state.relationType, this.stream.getAttribute("maxRelations")) || 0;
	},
	/**
	 * Implement settings UI for admins
	 * @method settings
	 */
	settings: function () {
		var tool = this;
		var state = tool.state;
		var $toolElement = $(tool.element);

		$toolElement.addClass("Streams_calls_settings").on(Q.Pointer.fastclick, function () {
			Q.invoke({
				title: tool.text.calls.SettingsTitle,
				columnClass: "Streams_calls_settings",
				className: "Streams_calls_settings",
				template: {
					name: "Streams/calls/settings",
					fields: {
						text: tool.text.calls,
						maxCalls: tool.getMaxCalls()
					}
				},
				trigger: $toolElement[0],
				callback: function () {
					// if opened in columns - third argument is a column element,
					// if opened dialog - first argument is dialog element
                    console.log('Streams_calls_related0', state.publisherId, state.streamName);

                    var parentElement = arguments[2] instanceof HTMLElement ? arguments[2] : arguments[0];
					$(".Streams_calls_related", parentElement).tool("Streams/related", {
						publisherId: state.publisherId,
						streamName: state.streamName,
						relationType: state.relationType,
						editable: false,
						closeable: true,
						sortable: false,
						realtime: true
					}).activate(function (e) {
						console.log('Streams_calls_related', e, this);
                    });

					$("button[name=update]", parentElement).on(Q.Pointer.fastclick, function () {
						var maxCalls = parseInt($("input[name=maxCalls]", parentElement).val());
						var maxRelations = tool.stream.getAttribute("maxRelations") || {};
						var oldMaxCalls = parseInt(Q.getObject(state.relationType, maxRelations));

						if (maxCalls !== oldMaxCalls) {
							maxRelations[state.relationType] = maxCalls;
							tool.stream.setAttribute("maxRelations", maxRelations).save();
						}
					});

					parentElement.forEachTool("Streams/webrtc/preview", function () {
						console.log('calls.js; state.mainWebrtcStream', state.parentClipTool.webrtcStream,  state.parentClipTool.state.webrtcStream)
						var previewTool = this;
                        this.state.parentClipTool = state.parentClipTool;
                        this.state.mainWebrtcRoom = state.parentClipTool.state.mainWebrtcRoom;
                        this.state.mainWebrtcStream = state.parentClipTool.state.webrtcStream;
						this.state.onWebRTCRoomEnded.set(function () {
							if (!state.isAdmin) {
								return;
							}

                            Q.req({
                                publisherId: tool.state.mainWebrtcStream.fields.publisherId ,
                                streamName: tool.state.mainWebrtcStream.fields.name ,
                                ofUserId: previewTool.state.publisherId,
                                'Q.method': 'delete'
                            }, "Streams/access", ['data'], function (err, data) {
                            	console.log('access removed')
                            });

							Q.Streams.unrelate(
								state.publisherId,
								state.streamName,
								state.relationType,
								this.stream.fields.publisherId,
								this.stream.fields.name
							);
						}, tool);
					}, tool);
				}
			});
		});
	},
	/**
	 * Implement call UI for regular users
	 * @method call
	 */
	call: function () {
		var tool = this;
		var state = tool.state;
		var $toolElement = $(tool.element);
        var $hostsParticipants = $(".Media_clip_hosts_participants", state.parentClipTool.element);
        function getMainWebRTCStreams(callback) {
            state.parentClipTool.stream.relatedTo(Q.Media.clip.webrtc.relations.main, function(){
                var keys = Object.keys(this.relatedStreams);
                console.log('getMainWebRTCStreams this.relatedStreams', this.relatedStreams)
                var stream = this.relatedStreams[keys[0]];
                if(callback) callback(stream);
            })
        }
        getMainWebRTCStreams(function (stream) {
            console.log('getMainWebRTCStreams stream', stream)
        });
        state.parentClipTool.stream.onMessage("Media/webrtc/guest").set(function (stream, message) {

            console.log('call: Media/webrtc/guest', stream, message);
            var invite = JSON.parse(message.instructions);
            if(invite.userId != Q.Users.loggedInUserId()) return;

            if(invite.joined == true) {
                getMainWebRTCStreams(function (stream) {
                    console.log('getMainWebRTCStreams stream', stream)
                    console.log('getMainWebRTCStreams tool.webrtcClassInstance', tool.webrtcClassInstance)

                    if(tool.webrtcClassInstance == null) {
                        /*tool.webrtcClassInstance = Streams.WebRTC.start({
                            publisherId: stream.fields.publisherId,
                            streamName: stream.fields.name,
                            resumeClosed: false,
                            useExisting: false,
                            closeManually: true,
                            tool: tool,
                            onStart: function (webrtcClassInstance) {
                                tool.webrtcClassInstance = webrtcClassInstance;
                            }
                        });*/
                    } else {
                        tool.webrtcClassInstance.switchTo(stream.fields.publisherId, stream.fields.name);
                    }
                })
			} else {
                if(tool.webrtcClassInstance != null) tool.webrtcClassInstance.stop();
			}


        });

		$toolElement.addClass("Streams_calls_call").on(Q.Pointer.fastclick, function () {
			Q.prompt(null, function (content) {
				if (!content) {
					return;
				}

                /*tool.webrtcClassInstance = Q.Streams.WebRTC.start({
                    element: $hostsParticipants[0],
                    roomPublisherId: state.publisherId,
					relationType: state.relationType,
					content: content,
					resumeClosed: false,
					useExisting: false,
					closeManually: true,
					tool: tool,
                    onStart: function (webrtcClassInstance) {
						console.log('Streams.WebRTC.start onStart', this)
                    }
				});*/

                tool.webrtcClassInstance = Streams.WebRTC.start({
                    publisherId: state.publisherId,
                    streamName: state.streamName,
                    relationType: state.relationType,
                    content: content,
                    resumeClosed: false,
                    useExisting: false,
                    closeManually: true,
                    tool: tool,
                });
			}, {
				title: tool.text.calls.CallReasonTitle,
				noClose: false
			});
		});
	}
});

Q.Template.set("Streams/calls/settings",
	'<div class="Streams_calls_related"></div>' +
	'<label>{{text.MaxCalls}}</label><input name="maxCalls" type="number" value="{{maxCalls}}">' +
	'<button class="Q_button" name="update">{{text.Update}}</button>'
);

})(Q, Q.$, window);