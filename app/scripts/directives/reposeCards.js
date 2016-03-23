'use strict';

angular.module('reposePlaygroundApp')
  .directive('reposeCards', function (Auth, ReposeService, $location, $log, $modal) {
    return {
      templateUrl: 'views/reposeCards.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log('reposeCards:',scope, element, attrs);

        scope.logout = function() {
          Auth.logout();
          $location.path('/');
        }

        scope.viewConfiguration = function(repose) {
          $log.info('view configuration: ', repose);
          $modal.open({
            templateUrl: '/views/config_modal.html',
            backdrop: 'static',
            controller: 'ConfigModalInstanceCtrl',
            resolve: {
              repose: function() {
                return repose;
              }
            }
          });
        }

        scope.deploy = function(repose){
          $log.info('deployApp called: ', repose);
          ReposeService.deployApp(repose.id)
          .then(function(data){
            console.log('reposeCards:',scope.reposes);
            scope.ui.waitingForLoad = false;
            repose.status = "deploying";
            repose.message = "";
            //scope.reposes.splice(repose, 1);
            $log.info('ReposeCards ReposeService.deleteapp::got back repose instances: ', scope.reposes);
          })
          .catch(function(err){
            scope.ui.waitingForLoad = false;
            scope.ui.reposeFetchError = true;
            $log.error('ReposeCards ReposeService.stopInstance::Got an error: ', err);

          });
        }
  
  
        //scope.showapp = function(repose){
          //$log.info('showapp called: ', repose);
          //$modal.open({
            //templateUrl: '/views/showApp.html',
            //backdrop: 'static',
            //controller: 'ConfigModalInstanceCtrl',
            //resolve: {
              //repose: function() {
                //return repose;
              //}
            //}
          //});
          //ReposeService.showApp(repose.id)
          //.then(function(data){
            //console.log('reposeCards:',scope.reposes);
            //scope.ui.waitingForLoad = false;
            ////repose.status = "Stopped";
            ////repose.message = "";
            //scope.reposes.splice(repose, 1);
            //$log.info('ReposeCards ReposeService.deleteapp::got back repose instances: ', scope.reposes);
          //})
          //.catch(function(err){
            //scope.ui.waitingForLoad = false;
            //scope.ui.reposeFetchError = true;
            //$log.error('ReposeCards ReposeService.stopInstance::Got an error: ', err);

          //});
        //}
  
        scope.deleteapp = function(repose){
          $log.info('deleteapp called: ', repose);
          ReposeService.deleteInstance(repose.id)
          .then(function(data){
            console.log('reposeCards:',scope.reposes);
            scope.ui.waitingForLoad = false;
            repose.status = "DELETING";
            //repose.message = "";
            //scope.reposes.splice(repose, 1);
            $log.info('ReposeCards ReposeService.deleteapp::got back repose instances: ', scope.reposes);
          })
          .catch(function(err){
            scope.ui.waitingForLoad = false;
            scope.ui.reposeFetchError = true;
            $log.error('ReposeCards ReposeService.stopInstance::Got an error: ', err);

          });
        }
    
        scope.stop = function(repose){
          $log.info('stop called: ', repose);
          ReposeService.stopInstance(repose.id)
          .then(function(data){
            console.log('reposeCards:',scope.reposes);
            scope.ui.waitingForLoad = false;
            repose.status = "Stopped";
            repose.message = "";
            $log.info('ReposeCards ReposeService.stopInstance::got back repose instances: ', scope.reposes);
          })
          .catch(function(err){
            scope.ui.waitingForLoad = false;
            scope.ui.reposeFetchError = true;
            $log.error('ReposeCards ReposeService.stopInstance::Got an error: ', err);

          });
        }

        scope.start = function(repose){
          $log.info('start called: ', repose);
          ReposeService.startInstance(repose.id)
          .then(function(data){
            console.log('reposeCards:',scope.reposes);
            scope.ui.waitingForLoad = false;
            repose.status = "Running";
            repose.message = "";
            $log.info('ReposeCards ReposeService.startInstance::got back repose instances: ', scope.reposes);
          })
          .catch(function(err){
            scope.ui.waitingForLoad = false;
            scope.ui.reposeFetchError = true;
            $log.error('ReposeCards ReposeService.startInstance::Got an error: ', err);

          });
        }
      }
    };
  });
