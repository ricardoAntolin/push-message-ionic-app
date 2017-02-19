'use strict';
angular.module('app')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home-view.html',
                controller: 'homeCtrl'
            })
            .state('message', {
                url: '/message',
                templateUrl: 'templates/message-view.html',
                controller: 'messageCtrl',
                params: {message: null}
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');
    })