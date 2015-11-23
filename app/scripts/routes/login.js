'use strict';

angular.module('reposePlaygroundApp')
  .config(function ($stateProvider, $logProvider) {
    var $log =  angular.injector(['ng']).get('$log');
    $log.info('in login router (part of config bootstrap)', $stateProvider)
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        landing: true
      });
  });