'use strict';
angular.module('app.home')
    .controller('homeCtrl', function($scope, homeService, dataFactory, $rootScope) {
        dataFactory.data.badge = 0;
        $scope.model = {};

        $scope.deleteMsg = function(deviceMessage) {
            deviceMessage.read = true;
            deviceMessage.deleted = true;
            homeService.updateMessage(deviceMessage).then(function(response) {
                _getMessages(dataFactory.data.deviceToken);
            }, function(error) {});
        };

        $scope.deleteAllMessages = function() {
            homeService.deleteAllMessage(dataFactory.data.deviceToken).then(function(response) {
                _getMessages(dataFactory.data.deviceToken);
            }, function(error) {});
        };

        function _getMessages(deviceToken) {
            homeService.getMessages(deviceToken).then(function(response) {
                var messages = new Array();
                response.data.map(message => {
                    message.sent_date = new Date(message.sent_date);
                    var deleted = false;
                    if(angular.isDefined(message.deviceMessages[0])){
                        deleted = message.deviceMessages[0].deleted;
                    }
                    if (!deleted) messages.push(message);
                });
                $scope.model.messages = messages;
            }, function(error) {
                console.log(error);
            });
        };
        $rootScope.$on('deviceTokenId',(event,deviceTokenId) =>{
            _getMessages(deviceTokenId);
        });
    })