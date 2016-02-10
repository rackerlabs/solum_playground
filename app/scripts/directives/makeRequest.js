'use strict';

angular.module('reposePlaygroundApp')
  .directive('makeRequest', function ($log, ReposeService) {
    return {
      templateUrl: 'views/makeRequest.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        $log.info('In makeRequest directive: ', scope, element, attrs);
        scope.methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'RANDOM'];
        scope.headers = [
          {
            name: '',
            value: ''
          }
        ];


        scope.addOneToList = function(data, data2) {
          $log.info('makeRequest::addOneToList', data, data2)
          data.push({
            name: '',
            value: ''
          })
          $log.info('makeRequest::addOneToList', data, data2)
        }

        scope.removeOneFromList = function(list, index) {
          $log.info('makeRequest::removeOneFromList', list, index)
          list.splice(index, 1);
          $log.info('makeRequest::removeOneFromList', list, index)
        }

        function cleanErrors(){
          scope.ui.errorMessage = "";
        }

      }
    };
  });
