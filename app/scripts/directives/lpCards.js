'use strict';

angular.module('reposePlaygroundApp')
  .directive('lpCards', function (Auth, ReposeService, $location, $log, $modal) {
    return {
      templateUrl: 'views/lpCards.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log('lpCards:',scope, element, attrs);

        scope.logout = function() {
          Auth.logout();
          $location.path('/');
        }

        scope.showLogDetails = function(data) {
          ReposeService.getLanguagepackLogs(data.uuid)
          .then(function(data){
            scope.ui.waitingForLoad = false;
            $log.info('show languagepack logs: ', data);
            $modal.open({
              templateUrl: '/views/log_modal.html',
              backdrop: 'static',
              controller: 'LogModalInstanceCtrl',
              resolve: {
                header: function() {
                  return 'Log file:' + data.location;
                },
                data: function() {
                  return data;
                }
              }
            });            
          })
        .catch(function(err){
          alert("Failed to get languagepack logs");
          scope.ui.waitingForLoad = false;
          scope.ui.reposeFetchError = true;
          $log.error('lpCards ReposeService.deleteLP::Got an error: ', err);
        });
      }
        
        scope.deleteLP = function(repose){
          $log.info('deleteLP called: ', repose);
          ReposeService.deleteLP(repose.name)
          .then(function(data){
            console.log('lpCards:',scope.reposes);
            scope.ui.waitingForLoad = false;
            repose.status = "DELETING";
            $log.info('lpCards ReposeService.deleteLP::got back repose instances: ', scope.reposes);
          })
          .catch(function(err){
            scope.ui.waitingForLoad = false;
            scope.ui.reposeFetchError = true;
            $log.error('lpCards ReposeService.deleteLP::Got an error: ', err);

          });
        }

      }
    };
  });
