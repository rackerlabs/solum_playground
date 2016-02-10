'use strict';

angular.module('reposePlaygroundApp')
  .config(function ($stateProvider, $logProvider) {
    var $log =  angular.injector(['ng']).get('$log');
    $log.info('in main router (part of config bootstrap)', $stateProvider)
    $stateProvider
      .state('main', {
        url: '/main',
        authenticate: true,
        views: {
          '': {
            templateUrl: 'views/main.html'
          },
          'content@main': {
            templateUrl: 'views/content.html',
            controller: 'InternalCtrl'
          },
          'secondary-nav@main': { templateUrl: 'views/secondaryNav.html'},
          'main-nav@main': { templateUrl: 'views/mainNav.html'}
        },
      });
  });
