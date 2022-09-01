return <<<JSON_CONFIG
{
	"Q": {
		"localNotYetConfigured": "TODO: REMOVE THIS ENTRY WHEN YOU ARE DONE WITH THE LOCAL CONFIGURATION",
		"web": {
			"appRootUrl": "http://gmba.local/MyApp",
			"controllerSuffix": ""
		},
		"node" : {
			"host": "MyApp.loc",
			"port": "10500",
			"url": "https://myapp.local:10500", /* "{{baseUrl}}/node.js", */
			"https": false, /* {
				"key": "location of key file here",
				"cert": "location of cert file here",
				"ca": "location of the ca file, optional",
				"dhparam": "location of the dhparam file, optional"
			}, */
			"socket": {}
		},
		"nodeInternal": {
			"host": "127.0.0.1",
			"port": "10501"
		},
		"internal": {
			"secret": "TODO: CHANGE TO SOME RANDOM STRING, FOR SIGNING DATA TO BE SENT BACK TO US"
		},
		"images": {
			"pixabay": null /* {
				"username": "TODO: YOUR USERNAME HERE",
				"key": "TODO: YOUR SECRET KEY HERE"
			} */
		},
		"environment": "",
		/* "scriptFiles": ["config/Q/urls.php", "config/Q/preload.php"], */
		"javascript": {
			"prettyPrintData": true
		}
	},
	"Db": {
		"connections": {
			"*": {
				"dsn": "mysql:host=127.0.0.1;dbname=MyApp",
				"username": "MyApp",
				"password": "somepassword",
				"driver_options": { "3": 2 }	
			},
			"Users": { "prefix": "users_" },
			"Streams": { "prefix": "streams_" },
			"Assets": { "prefix": "assets_" },
			"Places": { "prefix": "places_" },
			"Websites": { "prefix": "websites_" }
		}
	},
	"Users": {
		"community": {
			"id": "MyApp",
			"name": "MyApp"
			/* "suffix": "Inc" */
		},
		"email": {
			"smtp": null, /* {
				"auth": "login",
				"username": "USERNAME HERE",
				"password": "PASSWORD HERE",
				"ssl": "ssl",
				"port": 465,
				"host": "smtp.sendgrid.net"
			}, */
			"from": ["notifications@MyApp.com", "MyApp"]
		},
		"mobile": {
			"twilio": null, /* {
				"sid": "YOUR SID HERE",
				"token": "YOUR TOKEN HERE"
			}, */
			"from": "+1234567890"
		},
		"authorize": {
			"terms": {
				"uri": null
			},
			"clients": {
				"MyApp-ios": {
					"paths": null,
					"scopes": {
						"all": "give this app full access"
					},
					"automatic": true
				},
				"MyApp-android": {
					"paths": null,
					"scopes": {
						"all": "give this app full access"
					},
					"automatic": true
				}
			}
		},
		"apps": {
			"platforms": ["wallet", "facebook", "ios", "android"],
			"export": ["wallet", "facebook"],
			/* TODO: set up your external apps on external services */
			"wallet": {
				"MyApp": {
					"chain": "ETH",
					"network": "mainnet",
					"appId": "EVM CHAIN ID HERE"
				}
			},
			"facebook": {
				"MyApp": {
					"name": "FACEBOOK APP NAME HERE",
					"appId": "FACEBOOK APP ID HERE",
					"secret": "PUT SECRET HERE",
					"url": "http://apps.facebook.com/YOURAPP",
					"baseUrl": "https://myapp.local",
					"paths": [""],
					"domains": ["THE BASE DOMAINS YOU SET IN FACEBOOK, USED FOR AUTH COOKIE"]
				}
			},
			"ios": {
				"MyApp": {
					"appId": "com.mycompany.myapp",
					"url": "https://itunes.apple.com/us/app/keynote/id361285480?mt=8",
					"baseUrl": "https://myapp.local",
					"scheme": "myapp://",
					"paths": [""],
					"customUserAgentString": "myapp.ios",
					"sandbox": true,
					"logging": "ios",
					"device": {
						"added": ["MyApp/content", ["notifications", "Enabled"]]
					},
					"secret": "SHARED SECRET HERE",
					"token": { /* see https://github.com/node-apn/node-apn/blob/master/doc/provider.markdown */
						"key": "local/Users/certs/MyApp/token/cert.p8",
						"keyId": "TODO: Find it at https://developer.apple.com/account/ios/certificate/",
						"passphrase": null,
						"teamId": "TODO: Find it at https://developer.apple.com/account/#/membership"
					},
					"ssl": { /* see https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html#//apple_ref/doc/uid/TP40012582-CH26-SW11 */
						"cert": "local/Users/certs/MyApp/sandbox/bundle.pem",
						"passphrase": null
					},
					"authorize": {
						"automatic": false
					}
				}
			},
			"android": {
				"MyApp": {
					"appId": "com.mycompany.myapp",
					"url": "https://play.google.com/store/apps/details?id=com.mycompany.myapp",
					"baseUrl": "https://myapp.local",
					"scheme": "myapp://",
					"paths": ["/"],
					"custom": "myapp.android",
					"key": "AUTHORIZATION KEY HERE",
					"senderID": "YOUR SENDER ID HERE",
					"authorize": {
						"automatic": false
					}
				}
			},
			"amazon": {
				"MyApp": {
					"appId": "B01MQTS32B",
					"url": "http://www.amazon.com/gp/mas/dl/android?asin=B01MQTS32B",
					"baseUrl": "https://myapp.local",
					"paths": ["/"],
					"customUserAgentString": "myapp.amazon",
					"clientId": "ADM CLIENT ID HERE",
					"secret": "SHARED SECRET HERE"
				}
			},
			"windows": {
				"MyApp": {
					"appId": "9nblggh2s4gt",
					"url": "https://www.microsoft.com/en-us/store/p/monster-go/9nblggh2s4gt",
					"baseUrl": "https://myapp.local",
					"paths": ["/"],
					"customUserAgentString": "myapp.windows",
					"clientId": "PACKAGE SECURITY IDENTIFIER",
					"secret": "SHARED SECRET HERE"
				}
			},
			"web": {
				"MyApp": {
					"appId": "myapp.local",
					"baseUrl": "https://myapp.local",
					"paths": ["/"],
					"privateKey": "FILENAME RELATIVE TO MyApp/local",
					"publicKey": "THE LITERAL PUBLIC KEY"
				}
			}
		},
		"newsapi": {
			"key": "TODO: GET A NEWSAPI.ORG KEY FOR Users/activate SUGGESTIONS"
		}
	},
	"Streams": {
		"notifications": {
			"appIds": { /*
				"facebook": ["FACEBOOK APP ID HERE"],
				"ios": ["361285480"]
			*/ }
		},
		"froala": { 
			"key": "TODO: GET FROALA KEY"
		},
		"twilio": {
			"accountSid": null,
			"apiKey": null,
			"apiSecret": null,
			"authToken": null
		},
		"webrtc": {
			/*"socketServerHost": "localhost",*/
			"socketServerPort": "8443",
			"useTwilioTurnServers": false,
			"turnServers": [
		  		/*{
					"url": "",
					"username": "",
					"urls": "",
					"credential": ""
				}*/
			],
		  	"debug": false
		}
	},
	"Assets": {
		"payments":  {
			"stripe": null, /* {
				"secret": "TODO: CAN GET STRIPE SECRET",
				"publishableKey": "TODO: CAN GET STRIPE PUBLISHABLE KEY"
			}, */
			"authnet": null /* {
				"name": "TODO: CAN GET AUTHNET NAME",
				"transactionKey": "TODO: CAN GET AUTHNET TRANSACTION KEY",
				"testing": false
			} */
		}
	},
	"Places": {
		"google": {
			"keys": {
				"server": "TODO: GET SERVER KEY",
				"web": "TODO: GET WEB KEY"
			}
		}
	},
	"MyApp": {
		"debugging": true
	}
}
JSON_CONFIG;