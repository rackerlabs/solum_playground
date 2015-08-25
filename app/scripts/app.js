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
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    console.log('routing', $urlRouterProvider, $locationProvider)
    $urlRouterProvider
      .otherwise('/login');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    console.log($location)
    return {
      // Add authorization token to headers
      request: function (config) {
        console.log('config', config)
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        console.log('config', response)
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
  .run(function ($rootScope, $location, Auth) {
    console.log('run', $location)
    $rootScope.$on('$stateChangeStart', function (event, next) {
      //check if user is logged in
      console.log('state change')
      Auth.isLoggedInAsync(function (loggedIn) {
        console.log('state change', loggedIn, next);
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        } else if (next.landing && loggedIn) {
          //$location.path('/internal')
          //check if repose instances exist
        } else {
          var user = Auth.getCurrentUser();
          $rootScope.raxTenant = user.raxTenant;
          $rootScope.username = user.username;
        }
      });
    })
  });
