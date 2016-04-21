'use strict';

angular.module('reposePlaygroundApp')
  .config(function ($stateProvider, $logProvider) {
    var $log =  angular.injector(['ng']).get('$log');
    $log.info('in create router (part of config bootstrap)', $stateProvider)
    $stateProvider
      .state('create', {
        url: '/create',
        authenticate: true,
        views: {
          '': {
            templateUrl: 'views/create.html'
          },
          'content@create': {
            templateUrl: 'views/create_content.html',
            controller: 'CreateCtrl'
          },
          'secondary-nav@create': { templateUrl: 'views/secondaryNav.html'},
          'main-nav@create': { templateUrl: 'views/mainNav.html'},
          'footer@create': { templateUrl: 'views/footer.html', controller: 'FooterCtrl'}
        }
      });
  });
