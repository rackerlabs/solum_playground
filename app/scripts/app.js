'use strict';

/**
 * @ngdoc overview
 * @name reposePlaygroundApp
 * @description
 * # reposePlaygroundApp
 *
 * Main module of the application.
    'btford.socket-io',
 */
angular
  .module('reposePlaygroundApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'checklist-model',
    'ui.bootstrap-slider',
    'prettyXml',
    'ngFileSaver',
    'ngFileUpload'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $logProvider) {
    var $log =  angular.injector(['ng']).get('$log');
    $log.info('In bootstrap config ', 'state provider: ', $stateProvider, 'url router: ', $urlRouterProvider, 'location provider: ', $locationProvider, 'http provider: ', $httpProvider);
    $urlRouterProvider
      .otherwise('/login');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location, $log) {
    $log.info('in auth Interceptor factory', $location, $location.$$path, $location.$$url);
    return {
      // Add authorization token to headers
      request: function (config) {
        $log.info('authInterceptor::auth interceptor request: ', config, $cookieStore);
        $log.info('token store: ', $cookieStore.get('token'))
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Token = $cookieStore.get('token');
        }
        $log.info('authInterceptor::request for authorization');
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        $log.warn('authInterceptor::failed response', response)
        if (response.status === 401) {
          $log.warn('authInterceptor::got back a 401.  gotta redirect and remove some cookies');
          window.location = '/login';
          //$location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          $log.warn('authInterceptor::got something else from response: ', response.status);
          return $q.reject(response);
        }
      }
    };
  })
  .run(function ($rootScope, $location, Auth, $log) {
    $log.info('in run method for bootstrap', $location, $rootScope, $location.$$path);

    $rootScope.$on('$stateChangeStart', function (event, next) {
      //check if user is logged in
      $log.info('run::executed state change check.  Check to validate we are logged in.', event, next)
      Auth.isLoggedInAsync(function (loggedIn) {
        $log.info('run::We got the response.  Logged in: ', loggedIn, 'Next state authenticate: ', next.authenticate, 'Next state landing page: ', next.landing);
        if (next.authenticate && !loggedIn) {
          $log.warn('run::Next state has authentication on but we are not logged in');
          $location.path('/login');
        } else if (next.landing && loggedIn) {
          $log.info('run::Next state has a landing page as true and we are logged in');
          $location.path('/main')
          //check if repose instances exist
        } else if(next.authenticate && loggedIn) {
          $log.info('run::Next state has authentication on and we are logged in');
          var user = Auth.getCurrentUser();
          $log.info('run::logged in user ', user, $location.$$path);
          $rootScope.raxTenant = user.raxTenant;
          $rootScope.username = user.username;
          $location.path($location.$$path);
        } else {
          $log.error('run::Some other combination.  Bail out to login');
          $location.path('/login');
        }
      });
    })
  });
