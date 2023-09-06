Q.exports(function (_doCancel, _handleXid, _doAuthenticate) {
    
    /**
	 * Authenticates this session with a given platform,
	 * if the user was already connected to it.
	 * It tries to do so by checking a cookie that would have been set by the server.
	 * @method authenticate
	 * @param {String} platform Currently only supports "facebook", "ios" or "android"
	 * @param {Function} onSuccess Called if the user successfully authenticates with the platform, or was already authenticated.
	 *  It is passed the user information if the user changed.
	 * @param {Function} onCancel Called if the authentication was canceled. Receives err, options
	 * @param {Object} [options] object of parameters for authentication function
	 *   @param {Function|Boolean} [options.prompt=null] which shows the usual prompt unless it was already rejected once.
	 *     Can be false, in which case the user is never prompted and the authentication just happens.
	 *     Can be true, in which case the usual prompt is shown even if it was rejected before.
	 *     Can be a function with an onSuccess and onCancel callback, in which case it's used as a prompt.
	 *   @param {Boolean} [options.force] forces the getLoginStatus to refresh its status
	 *   @param {String} [options.appId=Q.info.app] Only needed if you have multiple apps on platform
	 */
    function authenticate(platform, onSuccess, onCancel, options) {

		options = options || {};
		var handler = Q.Users.authenticate[platform];
		if (!handler) {
			var handlers = Object.keys(Q.Users.authenticate).filter(function (k) {
				return Q.Users.authenticate.hasOwnProperty(k);
			});
			throw new Q.Error(
				"Users.authenticate: platform must be one of " + handlers.join(', ')
			);
		}
		Q.Users.authenticate.occurring = true;
		var appId = options.appId || Q.info.app;
		var platformAppId = Q.Users.getPlatformAppId(platform, appId);
		if (!platformAppId) {
			console.warn(
				"Users.authenticate: missing " + 
				["Users", "apps", platform, appId, "appId"].join('.')
			);
			return;
		}
		options.appId = appId;
		return handler.call(this, platform, platformAppId, onSuccess, onCancel, options);
    }
    
    // opens a browsertab and authenticates using AuthenticationSession
    authenticate.qbix = Q.Method.stub;
	
	// authenticates using platform, appId, udid provided in the WebView's initial querystring
	authenticate.ios = Q.Method.stub;
	authenticate.android = Q.Method.stub;
        
	// authenticates by opening facebook authentication flow
    authenticate.facebook = Q.Method.stub;
   	
	// authenticates by opening a wallet and asking user to sign a payload
	authenticate.web3 = Q.Method.stub;
    
    Q.Method.define(
        authenticate, 
        '{{Users}}/js/methods/Users/authenticate', 
        function() {
            return [_doCancel, _handleXid, _doAuthenticate];
        }
    );
    
    return authenticate;
});