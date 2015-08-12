'use strict';

angular.module('solumApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('apps', {
        url: '/apps',
        templateUrl: 'app/apps/apps.html',
        controller: 'AppsCtrl',
        authenticate: true
      });
  });