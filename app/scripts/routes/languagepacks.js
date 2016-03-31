'use strict';

angular.module('reposePlaygroundApp')
  .config(function ($stateProvider, $logProvider) {
    var $log =  angular.injector(['ng']).get('$log');
    $log.info('in main router (part of config bootstrap)', $stateProvider)
    $stateProvider
      .state('languagepacks', {
        url: '/languagepacks',
        authenticate: true,
        views: {
          '': {
            templateUrl: 'views/main.html'
          },
          'content@languagepacks': {
            templateUrl: 'views/lp_content.html',
            controller: 'LangpackCtrl'
          },
          'secondary-nav@languagepacks': { templateUrl: 'views/secondaryNav.html'},
          'main-nav@languagepacks': { templateUrl: 'views/mainNav.html'}
        },
      });
  });
