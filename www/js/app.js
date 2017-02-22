'use strict';
angular.module('app', ['ionic',
        'ngCordova.plugins.push_v5',
        'app.home', 'app.dataFactory', 'app.message'
    ])
    .run(function($ionicPlatform, $rootScope, $cordovaPushV5, dataFactory) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            // register push notification and get local push token
            localStorage.myPush = ''; // I use a localStorage variable to persist the token
            $cordovaPushV5.initialize( // important to initialize with the multidevice structure !!
                {
                    android: {
                        senderID: "709398865287"
                    },
                    ios: {
                        alert: 'true',
                        badge: true,
                        sound: 'true',
                        clearBadge: true
                    },
                    windows: {}
                }
            ).then(function(result) {
                $cordovaPushV5.onNotification();
                $cordovaPushV5.onError();

                $cordovaPushV5.register().then(function(resultreg) {
                    dataFactory.data.deviceToken = resultreg;
                    _initAppOperations();
                }, function(err) {
                    // handle error
                });

            });
        });
        $ionicPlatform.on('resume', function() {
            _initAppOperations();
        });
        /*
         * Push notification events
         */
         function _initAppOperations(){
            if (dataFactory.data.deviceToken) {
                dataFactory.enrollDevice(dataFactory.data.deviceToken).then((result, err) => {});
                $rootScope.$broadcast('deviceTokenId', dataFactory.data.deviceToken);
            }
         }

        $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) { // use two variables here, event and data !!!
            if (data.additionalData.foreground) {
                // do something if the app is in foreground while receiving to push - handle in app push handling
                if (dataFactory.data.deviceToken) {
                    _initAppOperations();
                }

            } else {
                // handle push messages while app is in background or not started
                if (ionic.Platform.isIOS()) {
                    dataFactory.data.badge++;
                    $cordovaPushV5.setBadgeNumber(dataFactory.data.badge).then(function(result) {
                        // OK
                    }, function(err) {
                        // handle error
                    });
                }
            }


            $cordovaPushV5.finish().then(function(result) {
                // OK finished - works only with the dev-next version of pushV5.js in ngCordova as of February 8, 2016
            }, function(err) {
                // handle error
            });
        });

        $rootScope.$on('$cordovaPushV5:errorOccurred', function(event, error) {
            // handle error
        });
    })