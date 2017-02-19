'use strict';
angular.module('app.dataFactory', [])
    .factory('dataFactory', function($http) {
        var urlBase = 'http://192.168.0.102:3000/api';
        this.data = {
            deviceToken: ''
        };

        this.getUrl = function(urlSuffix) {
            return urlBase + urlSuffix;
        };

        this.enrollDevice = function(deviceToken) {
            var enrollDeviceUrl = this.getUrl('/installations/enrollDevice');
            var platformDevice = 'ios';
            if (ionic.Platform.isAndroid()) platformDevice = 'android';
            return $http({
                url: enrollDeviceUrl,
                method: "POST",
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    deviceTokenId: deviceToken,
                    deviceType: platformDevice
                }
            });
        };
        return this;
    })