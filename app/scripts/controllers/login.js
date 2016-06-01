'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $log, $rootScope) {
    $log.info('in Login controller');
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $log.info('In LoginCtrl.login.  Try to log in with ', form)
      $scope.submitted = true;

      if(form.$valid) {
        $log.info('LoginCtrl::form is valid')
        Auth.login({
          username: $scope.user.username,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $rootScope.username = $scope.user.username;
          $log.info('LoginCtrl::Successful response', $location);
          $location.path('/main');
        })
        .catch( function(err) {
          $log.error('LoginCtrl::Failed response in LoginCtrl.login()', err);
          $scope.errors.other = [];
          $scope.errors.other.push(err);
          //for(var e in err){
            //$log.error('LoginCtrl::Err property: ', e, err[e], err[e].message);
            //if(err[e].message !== undefined){
              //$scope.errors.other.push(e + " => " + err[e].message)
            //} else {
              //$log.error('LoginCtrl::Err[e] does not have message property.  Iterate through list and add it up');
              //for(var i = 0; i < err[e].length; i ++){
                //$log.error('LoginCtrl::e will have ', err[e][i]);
                //$scope.errors.other.push(e + " => " + err[e][i]);
              //}
            //}
          //}
          $log.error($scope.errors.other);
        });
      }
    };

  });
