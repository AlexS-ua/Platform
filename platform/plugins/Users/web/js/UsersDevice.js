"use strict";
(function (Q, $) {

	var Users = Q.plugins.Users;

	/**
	 * @class Users.Device
	 */
	Users.Device = {
		/**
		 * Subscribe to listen for push notifications
		 * if the current environment supports it.
		 * (Web Push, Cordova, etc.)
		 * @method subscribe
		 * @static
		 * @param {Function} callback
		 * @param {Object} options
		 * @param {Boolean} options.userVisibleOnly whether the returned push subscription
		 *   will only be used for messages whose effect is made visible to the user
		 * @param {String} options.applicationServerKey A public key your push server
		 *   will use to send messages to client apps via a push server. This value is
		 *   part of a signing key pair generated by your application server, and usable
		 *   with elliptic curve digital signature (ECDSA), over the P-256 curve.
		 */
		subscribe: function (callback, options) {
			Users.Device.getAdapter(function (err, adapter) {
				if (err) {
					return Q.handle(callback, null, [err]);
				}
				// check whether notification granted
				Users.Device.notificationGranted(function (granted) {
					// if user refuses notifications - do nothing
					if (granted === false) {
						Q.handle(Users.Device.beforeSubscribe, Users.Device, [
							options, granted, false
						]);
						return Q.handle(callback, null, [null, null]);
					}
					// check if the device is subscribed
					Users.Device.subscribed(function (err, subscribed) {
						Q.handle(Users.Device.beforeSubscribe, Users.Device, [
							options, granted, subscribed
						]);
						if (err) {
							Q.handle(callback, null, [err]);
						}
						// if the device is subscribed then do nothing
						if (subscribed) {
							return Q.handle(callback, null, [null, subscribed]);
						}
						// if the user already granted notifications but the device is not subscribed then just subscribe
						// device without any confirmation dialog
						if (granted === true) {
							return adapter.subscribe(function (err, subscribed) {
								Q.handle(Users.Device.onSubscribe, Users.Device, [
									options, granted, subscribed
								]);
								Q.handle(callback, null, [err, subscribed]);
							}, options);
						}
						// if the user is undecided with notifications then do call the confirmation
						var userId = Q.Users.loggedInUserId();
						var cache = Q.Cache.session('Users.Permissions.notifications');
						var requested = Q.getObject(['cbpos'], cache.get(userId));

						// if permissions already requested - don't request it again
						if (requested !== undefined && requested !== null) {
							return Q.handle(callback, null, [null, null]);
						}

						Q.Text.get('Users/content', function (err, text) {
							text = Q.copy(Q.getObject(["notifications"], text));
							if (!text) {
								console.warn('Notifications confirmations texts not found');
							}
							// if not - ask
							Q.handle(Users.Device.beforeSubscribeConfirm, Users.Device, [
								options, granted, subscribed, text
							]);

							// set this to avoid duplicated notices
							cache.set(userId, 'in progress');

							Q.confirm(text.prompt, function (res) {
								// set cache to null before device subscription
								cache.set(userId, null);

								if (!res) {
									// save to cache that notifications requested
									// only if user refused, because otherwise - notifications has granted
									cache.set(userId, false);
									return Q.handle(callback, null, [null, null]);
								}

								adapter.subscribe(function (err, subscribed) {
									// if device subscribed set cache to true to avoid duplicate questions
									if (subscribed) {
										cache.set(userId, true);
									}

									Q.handle(Users.Device.onSubscribe, [options, granted, subscribed]);
									Q.handle(callback, null, [err, subscribed]);
								}, options);
							}, { ok: text.yes, cancel: text.no, title: text.title });
						});
					});
				});
			});
		},

		/**
		 * Unsubscribe to stop handling push notifications
		 * if we were previously subscribed
		 * @method unsubscribe
		 * @static
		 * @param {Function} callback
		 */
		unsubscribe: function (callback) {
			this.getAdapter(function (err, adapter) {
				if (err) {
					Q.handle(callback, null, [err]);
				} else {
					adapter.unsubscribe(function (err) {
						Q.handle(callback, null, [err]);
					});
				}
			});
		},

		/**
		 * Checks whether the user already has a subscription.
		 * @method subscribed
		 * @static
		 * @param {Boolean} callback Whether the user already has a subscription
		 */
		subscribed: function (callback) {
			this.getAdapter(function (err, adapter) {
				if (err) {
					Q.handle(callback, null, [err]);
				} else {
					adapter.subscribed(function (err, subscribed) {
						Q.handle(callback, null, [err, subscribed]);
					});
				}
			});
		},
		/**
		 * Return whether device have notifications granted or no
		 * @method notificationGranted
		 * @static
		 * @param {function} callback
		 * @return {string|bool} return true if granted, false if blocked, "default" if didn't make choise yet
		 */
		notificationGranted: function (callback) {
			this.getAdapter(function (err, adapter) {
				if (err) {
					Q.handle(callback, null, [err]);
				} else {
					adapter.notificationGranted(callback);
				}
			});
		},
		/**
		 * Event occurs when a notification comes in to be processed by the app.
		 * The handlers you add are supposed to process it.
		 * The notification might have brought the app back from the background,
		 * or not. Please see the documentation here:
		 * https://github.com/katzer/cordova-plugin-local-notifications
		 * @event onNotification
		 */
		onNotification: new Q.Event(),
		
		/**
		 * Occurrs when Users.Device.subscribe() is called,
	     * but before a subscription is possibly granted
		 * @event beforeSubscribe
		 */
		beforeSubscribe: new Q.Event(),
		
		/**
		 * Occurrs when Users.Device.subscribe() is called,
	     * but after a subscription is possibly granted
		 * @event onSubscribe
		 */
		onSubscribe: new Q.Event(),
		
		/**
		 * Occurrs when Users.Device.subscribe() is called,
		 * right before Q.confirm() is shown in some cases
		 * @event beforeSubscribeConfirm
		 */
		beforeSubscribeConfirm: new Q.Event(),
		
		/**
		 * Occurrs when Users.Device.unsubscribe() is called, but before action is taken
		 * @event beforeUnsubscribe
		 */
		beforeUnsubscribe: new Q.Event(),
		
		/**
		 * Occurrs when Users.Device.unsubscribe() is called, but before action is taken
		 * @event onUnsubscribe
		 */
		onUnsubscribe: new Q.Event(),

		/**
		 * Event occurs when the device adapter was initialized.
		 * @event onInit
		 */
		onInit: new Q.Event(),

		init: function (callback) {
			if (Q.info.isCordova && Q.info.isAndroid()) {
				// FCM adapter
				if (!window.FCMPlugin) {
					console.warn("FCMPlugin cordova plugin is not installed.");
					return;
				}
				this.adapter = adapterFCM;
			} else if (Q.info.isCordova && (Q.info.platform === 'ios')) {
				// PushNotification adapter
				if (!window.PushNotification) {
					console.warn("PushNotification cordova plugin is not installed.");
					return;
				}
				this.adapter = adapterPushNotification;
			} else if ((Q.info.browser.name === 'chrome') || (Q.info.browser.name === 'firefox')) {
				// Chrome and Firefox
				this.adapter = adapterWeb;
			} else if (Q.info.browser.name === 'safari') {
				// TODO implement adapter for Safari Browser
				this.adapter = adapterWeb;
			}
			if (this.adapter) {
				this.adapter.init(callback);
			} else {
				console.info("Users.Device: No suitable adapter for push notifications");
			}
		},

		getAdapter: function (callback) {
			if (!this.adapter) {
				Q.handle(callback, null, [new Error(
					'There is no suitable adapter for this type of device'
				)]);
				return;
			}
			Q.handle(callback, null, [null, this.adapter]);
		},

		adapter: null,

		serviceWorkerUpdate: function() {
			if ((this.adapter.adapterName !== 'Web') || !('serviceWorker' in navigator)) {
				return;
			}
			navigator.serviceWorker.getRegistrations().then(function (registrations) {
				Q.each(registrations, function (index, registration) {
					registration.update().then(function () {
						console.log("Service worker " + registration.active.scriptURL + " has been successfully updated");
					});
				});
			});
		}
	};

	// Adapter for Chrome and Firefox
	var adapterWeb = {

		adapterName: 'Web',

		init: function (callback) {
			this.appConfig = Q.getObject('Q.Users.browserApps.' + Q.info.browser.name + '.' + Q.info.app);
			if (!this.appConfig) {
				console.warn('Unable to init adapter. App config is not defined.');
				return;
			}
			Q.handle(callback);
		},

		subscribe: function (callback, options) {
			var appConfig = this.appConfig;

			if (!appConfig) {
				console.warn('Unable to init adapter. App config is not defined.');
				return Q.handle(callback, null);
			}

			this.getServiceWorkerRegistration(function (err, sw) {
				if (err) {
					return Q.handle(callback, null, [err]);
				}
				var userVisibleOnly = true;
				if (options && !options.userVisibleOnly) {
					userVisibleOnly = false;
				}
				sw.pushManager.subscribe({
					userVisibleOnly: userVisibleOnly,
					applicationServerKey: _urlB64ToUint8Array(appConfig.publicKey)
				}).then(function (subscription) {
					_saveSubscription(subscription, appConfig, function (err, res) {
						Q.handle(callback, null, [err, res]);
					});
				}).catch(function (err) {
					Users.Device.notificationGranted(function (granted) {
						if (granted) {
							console.error('Users.Device: Unable to subscribe to push.', err);
						} else {
							console.error('Users.Device: Permission for Notifications was denied');
						}
					});

					Q.handle(callback, null, [err]);
				});
			});
		},

		unsubscribe: function (callback) {
			if (false === Q.handle(Users.Device.beforeUnsubscribe, Users.Device, [])) {
				return false;
			}
			this.getServiceWorkerRegistration(function (err, sw) {
				if (err) {
					return Q.handle(callback, null, [err]);
				}
				sw.pushManager.getSubscription()
				.then(function (subscription) {
					if (!subscription) {
						return;
					}
					_deleteSubscription(subscription.endpoint, function (err, res) {
						Q.handle(callback, null, [err, res]);
					});
					subscription.unsubscribe();
					console.log('Users.Device: User is unsubscribed.');
					Q.handle(Users.Device.onUnsubscribe, Users.Device, [subscription]);
				});
			});
		},

		subscribed: function (callback) {
			this.getServiceWorkerRegistration(function (err, sw) {
				if (err)
					Q.handle(callback, null, [err]);
				else {
					sw.pushManager.getSubscription()
						.then(function (subscription) {
							Q.handle(callback, null, [null, subscription]);
						}).catch(function (err) {
						Q.handle(callback, null, [err]);
					});
				}
			});
		},

		/**
		 *
		 * @param callback
		 * @return {string|bool} Possible values: true, false, 'default'
		 */
		notificationGranted: function (callback) {
			if (window.Notification) {
				var permission;
				if (window.Notification.permission === 'granted') {
					permission = true;
				} else if (window.Notification.permission === 'denied') {
					permission = false;
				} else {
					permission = window.Notification.permission;
				}
				return Q.handle(callback, window.Notification, [permission]);
			}
			Q.handle(callback, null, [false]);
		},

		getServiceWorkerRegistration: function (callback) {
			var self = this;
			if (this.serviceWorkerRegistration) {
				return Q.handle(callback, null, [null, this.serviceWorkerRegistration]);
			}
			_registerServiceWorker.bind(this)(function (err, sw) {
				if (err)
					return Q.handle(callback, null, [err]);
				else {
					self.serviceWorkerRegistration = sw;
					return Q.handle(callback, null, [null, sw]);
				}
			});
		},

		serviceWorkerRegistration: null,

		appConfig: null

	};

	// Adapter for FCM
	var adapterFCM = {

		adapterName: 'FCM',

		init: function (callback) {
			FCMPlugin.onTokenRefresh(function (token) {
				_registerDevice(token);
			});
			FCMPlugin.onNotification(function (data) {
				// data.wasTapped is true: Notification was received on device tray and tapped by the user.
				// data.wasTapped is false: Notification was received in foreground. Maybe the user needs to be notified.
				Users.Device.onNotification.handle(data);
			});
			Q.handle(callback);
		},

		subscribe: function (callback) {
			FCMPlugin.getToken(function (token) {
				_registerDevice(token, callback);
			});
		},

		unsubscribe: function (callback) {
			var deviceId = _getFromStorage('deviceId');
			_removeFromStorage('deviceId');
			_deleteSubscription(deviceId, function (err, res) {
				Q.handle(callback, null, [err, res]);
			});
		},

		subscribed: function (callback) {
			if (_getFromStorage('deviceId')) {
				Q.handle(callback, null, [null, true]);
			} else {
				Q.handle(callback, null, [null, false]);
			}
		},

		notificationGranted: function (callback) {
			Q.handle(callback, null, [true]);
		}

	};

	// Adapter for PushNotification
	var adapterPushNotification = {

		adapterName: 'PushNotification',

		init: function (callback) {
			if (_getFromStorage('deviceId')) {
				_pushNotificationInit();
			}
			Q.handle(callback);
		},

		subscribe: function (callback) {
			_pushNotificationInit();
			Q.handle(callback);
		},

		unsubscribe: function (callback) {
			var deviceId = _getFromStorage('deviceId');
			_removeFromStorage('deviceId');
			_deleteSubscription(deviceId, function (err, res) {
				Q.handle(callback, null, [err, res]);
			});
		},

		subscribed: function (callback) {
			if (_getFromStorage('deviceId')) {
				Q.handle(callback, null, [null, true]);
			} else {
				Q.handle(callback, null, [null, false]);
			}
		},

		notificationGranted: function (callback) {
			PushNotification.hasPermission(function (data) {
				data.isEnabled ? Q.handle(callback, null, [true]) : Q.handle(callback, null, ['default']);
			});
		}

	};

	function _registerServiceWorker (callback) {
		if (Q.info.url.substr(0, 8) !== 'https://') {
			Q.handle(callback, null, [new Error("Push notifications require HTTPS")]);
			return;
		}
		if (!(('serviceWorker' in navigator) && ('PushManager' in window))) {
			Q.handle(callback, null, [new Error("Push messaging is not supported")]);
			return;
		}
		navigator.serviceWorker.register(Q.url('{{Users}}/js/sw.js'))
		.then(function (swReg) {
			navigator.serviceWorker.addEventListener('message', function (event) {
				Users.Device.onNotification.handle(event.data);
			});
			console.log('Service Worker is registered.');
			Q.handle(callback, null, [null, swReg]);
		})
		.catch(function (error) {
			Q.handle(callback, null, [error]);
			console.error('Users.Device: Service Worker Error', error);
		});
	}

	function _registerDevice (deviceId, callback) {
		if (!deviceId || !Q.Users.loggedInUser) {
			return Q.handle(callback, null, [new Error('Error while registering device. User must be logged in and deviceId must be set.')]);
		}
		var appId = Users.Device.appId;
		if (!appId) {
			return Q.handle(callback, null, [new Error('Error while registering device. AppId must be must be set.')]);
		}

		Q.req('Users/device', function (err, response) {
			var msg = Q.firstErrorMessage(err, response && response.errors);
			if (msg) {
				return console.warn("Users.Device._registerDevice" + msg);
			}

			Q.handle(Users.onDevice, [response.data]);
			_setToStorage('deviceId', deviceId);
			Q.handle(callback, null, [err, response]);
		}, {
			method: 'post',
			fields: {
				appId: appId,
				deviceId: deviceId
			}
		});
	}

	function _urlB64ToUint8Array (base64String) {
		var padding = '='.repeat((4 - base64String.length % 4) % 4);
		var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
		var rawData = window.atob(base64);
		var outputArray = new Uint8Array(rawData.length);
		for (var i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	}

	function _saveSubscription (subscription, appConfig, callback) {
		if (!subscription) {
			return Q.handle(callback, null, [new Error('No subscription data')]);
		}
		subscription = JSON.parse(JSON.stringify(subscription));
		Q.req('Users/device', function (err, response) {
			if (!err) {
				Q.handle(Users.onDevice, [response.data]);
			}
			Q.handle(callback, null, [err, response]);
		}, {
			method: 'post',
			fields: {
				deviceId: subscription.endpoint,
				auth: subscription.keys.auth,
				p256dh: subscription.keys.p256dh,
				appId: appConfig.appId
			}
		});
	}

	function _deleteSubscription (deviceId, callback) {
		if (!deviceId) {
			return;
		}
		Q.req('Users/device', function (err, response) {
			Q.handle(callback, null, [err, response]);
		}, {
			method: 'delete',
			fields: {
				deviceId: deviceId
			}
		});
	}

	function _pushNotificationInit () {
		var push = PushNotification.init({
			android: {},
			browser: {
				pushServiceURL: 'http://push.api.phonegap.com/v1/push'
			},
			ios: {
				alert: true,
				badge: true,
				sound: true
			},
			windows: {}
		});

		push.on('registration', function (data) {
			if (!Q.Users.loggedInUser) {
				return;
			}
			Q.Users.Device.subscribed(function (err, subscribed) {
				if (subscribed) {
					return;
				}
				_registerDevice(data.registrationId, function (err, res) {
					if (!err && !res.error) {
						_setToStorage('deviceId', data.registrationId);
					}
				});
			});
		});

		push.on('notification', function (data) {
			Q.extend(data, data.additionalData);
			Users.Device.onNotification.handle(data);
		});

		push.on('error', function (e) {
			console.warn("Users.Device: ERROR", e);
		});

		Users.logout.options.onSuccess.set(function () {
			PushNotification.setApplicationBadgeNumber(0);
		}, 'Users.PushNotifications');

	}

	function _getFromStorage (type) {
		return localStorage.getItem("Q.Users.Device." + type);
	}

	function _setToStorage (type, value) {
		localStorage.setItem("Q.Users.Device." + type, value);
	}

	function _removeFromStorage (type) {
		localStorage.removeItem("Q.Users.Device." + type);
	}

	Q.onReady.add(function () {
		if (Q.info.isCordova && (window.FCMPlugin || window.PushNotification)) {
			Users.Device.appId = Q.cookie('Q_appId');
			if (!Users.Device.appId) {
				return console.warn("appId is not defined");
			}
		}

		Users.Device.onInit.set(function () {
			// update device id if device subscribed
			Users.Device.subscribed(function (err, subscribed) {
				if (!subscribed) {
					return;
				}

				// resubscribe device
				Users.Device.unsubscribe(Users.Device.subscribe);
			});
		}, 'Users.Device');

		Users.Device.init(function () {
			// Device adapter was initialized
			Q.handle(Users.Device.onInit);
			console.log('Users.Device adapter init: ' + Users.Device.adapter.adapterName);
		});

	}, 'Users.Device');

	// remove device info from localStorage when user logout
	Users.onLogout.set(function () {
		Users.Device.unsubscribe(function () {
			console.log('Device is unsubscribed');
		});
	}, "Users.Device");

})(Q, jQuery);
