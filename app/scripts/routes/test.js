'use strict';

angular.module('reposePlaygroundApp')
  .config(function ($stateProvider, $logProvider) {
    var $log =  angular.injector(['ng']).get('$log');
    $log.info('in test router (part of config bootstrap)', $stateProvider)
    $stateProvider
      .state('test', {
        url: '/test/:repose_id',
        authenticate: true,
        views: {
          '': {
            templateUrl: 'views/test.html'
          },
          'content@test': {
            templateUrl: 'views/test_content.html',
            controller: 'TestCtrl'
          },
          'secondary-nav@test': { templateUrl: 'views/secondaryNav.html'},
          'main-nav@test': { templateUrl: 'views/mainNav.html'}
        }
      });
  });
