'use strict';
angular.module('app.home')
    .service('homeService', function($http, dataFactory) {

        this.getMessages = function(deviceTokenId) {
            var getMessagesUrl = dataFactory.getUrl('/messages/byDevice');
            return $http({
                url: getMessagesUrl,
                method: 'GET',
                params: {
                    deviceToken: deviceTokenId
                }
            });
        };

        this.updateMessage = function(deviceMessage) {
            var updateMessage = dataFactory.getUrl('/device_messages/' + deviceMessage.id + '/replace');
            return $http({
                url: updateMessage,
                method: 'POST',
                data: deviceMessage
            });
        };

        this.deleteAllMessage = function(deviceTokenId) {
            var deleteAllMessage = dataFactory.getUrl('/device_messages/deleteAllDeviceMessages');
            return $http({
                url: deleteAllMessage,
                method: 'POST',
                params: {
                    deviceToken: deviceTokenId
                }
            });
        }
    })