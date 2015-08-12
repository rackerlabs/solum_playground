'use strict';

angular.module('solumApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('internal', {
        url: '/internal',
        templateUrl: 'app/internal/internal.html',
        controller: 'InternalCtrl',
        authenticate: true,
        landing: true
      });
  });