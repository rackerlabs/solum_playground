'use strict';

angular.module('reposePlaygroundApp')
  .filter('requestHeaders', function ($log) {
    return function(headerList) {
      $log.info('in request headers filter', headerList);
      var headerString = "";
      angular.forEach(headerList, function(headerObject){
        if(headerObject['name'].length > 0)
          headerString += headerObject['name'] + " => " + headerObject['value'] + "\n";
      });
      return headerString;
    };
  })
  .filter('responseHeaders', function ($log) {
    return function(headerList) {
      $log.info('in response headers filter', headerList);
      var headerString = "";
      angular.forEach(headerList, function(headerValue, headerKey){
        if(headerKey.length > 0)
          headerString += headerKey + " => " + headerValue + "<br/>";
      });
      return headerString;
    };
  })
  .filter('filterDirection', function ($log) {
    return function(direction) {
      $log.info('in filter direction filter', direction);
      if(direction === 'Intrafilter Request Log')
        return '<i class="glyphicon glyphicon-forward"></i>';
      else if(direction === 'Intrafilter Response Log')
        return '<i class="glyphicon glyphicon-backward"></i>';
      else
        return "I dono";
    };
  })
  .filter('requestDirection', function ($log) {
    return function(direction) {
      $log.info('in request direction filter', direction);
      if(direction.indexOf('>>') > -1)
        return '<i class="glyphicon glyphicon-forward"></i>';
      else if(direction.indexOf('<<') > -1)
        return '<i class="glyphicon glyphicon-backward"></i>';
      else
        return "I dono";
    };
  })
  .filter('prettify', function($log){
    return function(xml) {
      $log.info(' in filter pretty', xml);
      return vkbeautify.xml(xml, 4)
    }
  });
