'use strict';

angular.module('reposePlaygroundApp')
  .config(function ($stateProvider) {
    console.log('in login', $stateProvider)
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        landing: true
      });
  });