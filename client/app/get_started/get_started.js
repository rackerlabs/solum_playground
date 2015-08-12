'use strict';

angular.module('solumApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('get_started', {
        url: '/get_started',
        templateUrl: 'app/get_started/get_started.html',
        controller: 'GetStartedCtrl',
        authenticate: true
      });
  });