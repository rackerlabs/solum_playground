'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('InternalCtrl', function ($scope, $log, ReposeService) {
    $log.info('In Internal Ctrl');
    var ui = {
      waitingForLoad: true,
      reposeFetchError: false
    };
    
    ReposeService.getInstances({
      uiStates: ui
    })
    .then(function(reposes){
      $log.info('InternalCtrl ReposeService.getInstances::got back repose instances: ', reposes);
    })
    .catch(function(err){
      $log.error('InternalCtrl ReposeService.getInstances::Got an error: ', err);
      
    });
  });
