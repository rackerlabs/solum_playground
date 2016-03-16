'use strict';

angular.module('reposePlaygroundApp')
  .config(function ($stateProvider, $logProvider) {
    var $log =  angular.injector(['ng']).get('$log');
    $log.info('in showapp router (part of config bootstrap)', $stateProvider)
    $stateProvider
      .state('showapp', {
        url: '/showapp/:app_id',
        authenticate: true,
        views: {
          '': {
            templateUrl: 'views/create.html'
          },
          'content@showapp': {
            templateUrl: 'views/show_content.html',
            controller: 'CreateCtrl'
          },
          'secondary-nav@showapp': { templateUrl: 'views/secondaryNav.html'},
          'main-nav@showapp': { templateUrl: 'views/mainNav.html'}
        }
      });
  });
