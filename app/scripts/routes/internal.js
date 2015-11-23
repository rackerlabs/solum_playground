'use strict';

angular.module('reposePlaygroundApp')
  .config(function ($stateProvider, $logProvider) {
    var $log =  angular.injector(['ng']).get('$log');
    $log.info('in internal router (part of config bootstrap)', $stateProvider)
    $stateProvider
      .state('internal', {
        url: '/internal',
        templateUrl: 'views/internal.html',
        controller: 'InternalCtrl',
        authenticate: true
      });
  });