'use strict';

angular.module('solumApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('detail', {
        url: '/detail/:id',
        templateUrl: 'app/detail/detail.html',
        controller: 'DetailCtrl'
      });
  });