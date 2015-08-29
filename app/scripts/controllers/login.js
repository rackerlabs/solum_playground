'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    console.log('in login controller')
    $scope.user = {};
    $scope.errors = {};
    
    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          username: $scope.user.username,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/internal');
        })
        .catch( function(err) {
          $scope.errors.other = [];
          for(var e in err){
            for(var i = 0; i < err[e].length; i ++){
              $scope.errors.other.push(e + " => " + err[e][i]);
            }
          }
          console.log($scope.errors.other);
        });
      }
    };

  });
