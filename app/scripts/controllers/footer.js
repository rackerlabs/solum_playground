'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('FooterCtrl', function ($scope, $log, ReposeService) {

    ReposeService.getHostname()
    .then(function(resp){
      $scope.hostname = resp.hostname;
      $log.info('InternalCtrl ReposeService.getHostname::got back response: ', resp);
    })
    .catch(function(err){
      $log.error('InternalCtrl ReposeService.getHostname::Got an error: ', err);

    });
    
  });
