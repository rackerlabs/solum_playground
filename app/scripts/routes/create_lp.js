'use strict';

angular.module('reposePlaygroundApp')
  .config(function ($stateProvider, $logProvider) {
    var $log =  angular.injector(['ng']).get('$log');
    $log.info('in create router (part of config bootstrap)', $stateProvider)
    $stateProvider
      .state('createlp', {
        url: '/createlp',
        authenticate: true,
        views: {
          '': {
            templateUrl: 'views/create.html'
          },
          'content@createlp': {
            templateUrl: 'views/create_lp_content.html',
            controller: 'CreateCtrl'
          },
          'secondary-nav@createlp': { templateUrl: 'views/secondaryNav.html'},
          'main-nav@createlp': { templateUrl: 'views/mainNav.html'},
          'footer@createlp': { templateUrl: 'views/footer.html', controller: 'FooterCtrl'}
        }
      });
  });
