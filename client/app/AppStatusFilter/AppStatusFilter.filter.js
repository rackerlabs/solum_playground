'use strict';

angular.module('solumApp')
  .filter('AppStatusFilter', function () {
    var statuses = [
      {
        'id': 'REGISTERED',
        'status_class': 'rs-status rs-status-processing' 
      },
      {
        'id': 'QUEUED',
        'status_class': 'rs-status rs-status-processing' 
      },
      {
        'id': 'UNIT_TESTING',
        'status_class': 'rs-status rs-status-processing' 
      },
      {
        'id': 'UNIT_TESTING_FAILED',
        'status_class': 'rs-status rs-status-error' 
      },
      {
        'id': 'UNIT_TESTING_PASSED',
        'status_class': 'rs-status rs-status-ok' 
      },
      {
        'id': 'BUILDING',
        'status_class': 'rs-status rs-status-processing' 
      },
      {
        'id': 'BUILT',
        'status_class': 'rs-status rs-status-ok' 
      },
      {
        'id': 'DEPLOYING',
        'status_class': 'rs-status rs-status-processing' 
      },
      {
        'id': 'DEPLOYED',
        'status_class': 'rs-status rs-status-ok' 
      },
      {
        'id': 'STARTING_APP',
        'status_class': 'rs-status rs-status-processing' 
      },
      {
        'id': 'ERROR',
        'status_class': 'rs-status rs-status-error' 
      },
      {
        'id': 'READY',
        'status_class': 'rs-status rs-status-ok' 
      }
    ];
    
    return function (input) {
      var status = statuses.filter(function(s){
        return s.id == input;
      });
      if(status.length > 0){
        return status[0].status_class;
      } else {
        return 'rs-status rs-status-disabled';
      }
    };
  });
