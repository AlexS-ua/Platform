(function (Q, $) {

    var Users = Q.plugins.Users;
    var _debug = null;
    const WITHIN_CAMERA = 1;
    const OUTSIDE_CAMERA = 2;
    /**
     * Analyses whether user seen on camera
     * @class Users.Faces
     * @constructor
     */
    Users.Faces =  function Users_Faces() {}

    /**
     *
     * @class Users.faceLandmarksDetection
     * @constructor
     */
    Users.Faces.faceLandmarksDetection = null
    /**
     *
     * @class Users.faceDetection
     * @constructor
     */
    Users.Faces.faceDetection = {}
    /**
     *
     * @class Users.faceLandmarksDetection
     * @constructor
     */
    Users.Faces.videoElement = null

    /**
     * Whether user looking on screen or not
     * @class Users.state
     * @constructor
     */
    Users.Faces.state = null;

    /**
     * Start webcam eye tracking on the browser.
     * @method Eyes.start
     * @param {Object} options options for the method
     * @param {Function} [options.stream] Video stream which are processed
     * @param {Function} [options.onChange] Callback called when eyes points are changing
     * @param {Function} [options.onEnter] Callback called when eyes points are within the viewport
     * @param {Function} [options.onLeave] Callback called when eyes points leaves viewport
     */
    Users.Faces.landmarksDetection = function (options) {
        var tfCore = null;
        var tfConverter = null;
        var tfBackendWebgl = null;
        var faceLandmarksDetection = null;
        options = Q.extend({
            element: null,
            landmarksDetection: false,
            onChange: new Q.Event(),
            onEnter: new Q.Event(),
            onLeave: new Q.Event()
        }, options);



        if(!findScript('{{Users}}/js/tf-core.js')) {
            Q.addScript('{{Users}}/js/tf-core.js', function () {
                Users.Faces.tfCore = window.tf;

            });
        }

        if(!findScript('{{Users}}/js/tf-converter.js')) {
            Q.addScript('{{Users}}/js/tf-converter.js');
        }

        if(!findScript('{{Users}}/js/tf-backend-webgl.js')) {
            Q.addScript('{{Users}}/js/tf-backend-webgl.js');
        }

        if(!findScript('{{Users}}/js/face-landmarks-detection.js')) {
            Q.addScript('{{Users}}/js/face-landmarks-detection.js', function () {
                faceLandmarksDetection = Users.Faces.faceLandmarksDetection = window.faceLandmarksDetection;
                init()
            });
        } else {
            faceLandmarksDetection = Users.Faces.faceLandmarksDetection
            init()
        }

        function init() {
            console.log('init')

            if(options.element != null) {
                startTracking(options.element)
            } else {
                navigator.mediaDevices.getUserMedia ({
                    'audio': false,
                    'video': true
                }).then(function (stream) {
                    console.log('init: getUserMedia')

                    let videoEl = document.createElement('VIDEO');
                    videoEl.srcObject = stream;
                    startTracking(videoEl);
                }).catch(function(err) {
                    console.error('FACE TRACKING ERROR' + err.name + ": " + err.message);
                });
            }
        }


        async function startTracking(element) {
            const model = await faceLandmarksDetection.load(
                faceLandmarksDetection.SupportedPackages.mediapipeFacemesh, {
                    maxFaces: 1
                });

            Users.Faces.landmarksDetection.detectionInterval = window.setInterval(async function(){
                // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain an
                // array of detected faces from the MediaPipe graph. If passing in a video
                // stream, a single prediction per frame will be returned.
                //console.log('model', model)
                const predictions = await model.estimateFaces({
                    input: element,
                    returnTensors: false,
                    flipHorizontal: false,
                    predictIrises: false
                });

                if (predictions.length > 0) {
                    if(Q.Users.Faces.state === OUTSIDE_CAMERA) {
                        options.onEnter.handle.call();
                        Q.Users.Faces.state = WITHIN_CAMERA;
                    }
                } else {
                    if(Q.Users.Faces.state === WITHIN_CAMERA) {
                        options.onLeave.handle.call();
                        Q.Users.Faces.state = OUTSIDE_CAMERA;
                    }
                }
            }, 100)
        }
    }

    Users.Faces.landmarksDetection.stop = function () {
        if(Users.Faces.landmarksDetection.detectionInterval != null) {
            clearInterval(Users.Faces.landmarksDetection.detectionInterval);
            Users.Faces.landmarksDetection.detectionInterval = null;
        }
    }

    /**
     * Start webcam eye tracking on the browser.
     * @method Eyes.start
     * @param {Object} options options for the method
     * @param {Function} [options.stream] Video stream which are processed
     * @param {Function} [options.onChange] Callback called when eyes points are changing
     * @param {Function} [options.onEnter] Callback called when eyes points are within the viewport
     * @param {Function} [options.onLeave] Callback called when eyes points leaves viewport
     */
    Users.Faces.startFaceDetection = function (options) {
        options = Q.extend({
            element: null,
            onEnter: new Q.Event(),
            onLeave: new Q.Event()
        }, options);


        if (!findScript('{{Users}}/js/tfjs.js')) {
            Q.addScript('{{Users}}/js/tfjs.js', function () {

            });
        } else {

        }

        if (!findScript('{{Users}}/js/blazeface.js')) {
            Q.addScript('{{Users}}/js/blazeface.js', function () {
                Users.Faces.faceDetection.blazeface = blazeface = window.blazeface;
                init()
            });
        } else {
            init()
        }

        function init() {
            console.log('init')

            if (options.element != null) {
                startTracking(options.element)
            } else {
                navigator.mediaDevices.getUserMedia({
                    'audio': false,
                    'video': true
                }).then(function (stream) {
                    let videoEl = Users.Faces.videoElement = document.createElement('VIDEO');
                    videoEl.srcObject = stream;

                    videoEl.addEventListener('loadeddata', function(e) {
                        startTracking(videoEl);
                    });
                    videoEl.addEventListener('canplay', (e) => {
                        if(videoEl.paused) videoEl.play()
                    });

                }).catch(function (err) {
                    console.error('FACE TRACKING ERROR' + err.name + ": " + err.message);
                });
            }
        }


        async function startTracking(element) {
            // Load the model.
            const model = await blazeface.load();

            // Pass in an image or video to the model. The model returns an array of
            // bounding boxes, probabilities, and landmarks, one for each detected face.


            Users.Faces.faceDetection.detectionInterval = window.setInterval(async function () {
                // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain an
                // array of detected faces from the MediaPipe graph. If passing in a video
                let returnTensors = false; // Pass in `true` to get tensors back, rather than values.
                let predictions = await model.estimateFaces(element, returnTensors);
                // stream, a single prediction per frame will be returned.

                if (predictions.length > 0) {
                    if (Q.Users.Faces.state === OUTSIDE_CAMERA || Q.Users.Faces.state === null) {
                        options.onEnter.handle.call();
                        Q.Users.Faces.state = WITHIN_CAMERA;
                    }
                } else {
                    if (Q.Users.Faces.state === WITHIN_CAMERA || Q.Users.Faces.state === null) {
                        options.onLeave.handle.call();
                        Q.Users.Faces.state = OUTSIDE_CAMERA;
                    }
                }
            }, 100)


        }


    }

    Users.Faces.faceDetection.stop = function () {
        if (Users.Faces.faceDetection.detectionInterval != null) {
            clearInterval(Users.Faces.faceDetection.detectionInterval);
            Users.Faces.faceDetection.detectionInterval = null;
        }
        if(Users.Faces.videoElement != null) {
            Users.Faces.videoElement.stop();
            Users.Faces.videoElement = null;
        }
    }

    function findScript(src) {
        var scripts = document.getElementsByTagName('script');
        var src = Q.url(src);
        for (var i=0; i<scripts.length; ++i) {
            var srcTag = scripts[i].getAttribute('src');
            if (srcTag && srcTag.indexOf(src) != -1) {
                return true;
            }
        }
        return null;
    };
})(Q, jQuery);
