
'use strict';

angular.module('solumApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/thisismain',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
  