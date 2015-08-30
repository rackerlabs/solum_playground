'use strict';

angular.module('reposePlaygroundApp')
  .config(function ($stateProvider) {
    console.log('in internal', $stateProvider)
    $stateProvider
      .state('internal', {
        url: '/internal',
        templateUrl: 'views/internal.html',
        controller: 'InternalCtrl'
      });
  });