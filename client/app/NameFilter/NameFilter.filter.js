'use strict';

angular.module('solumApp')
  .filter('NameFilter', function ($window) {
    return function (input) {
      var windowSize = Math.ceil($window.innerWidth/75);
      
      if(input.length > windowSize){
        return input.slice(0, windowSize) + '...';
      } else {
        return input;
      }
    };
  });
