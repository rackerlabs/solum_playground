'use strict';

angular.module('reposePlaygroundApp')
  .directive('component', function (ReposeService, $log, $compile, $rootScope, $modal, $location) {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        $log.info('in component view component', scope, element, attrs);
        scope.repose.componentData = [];
        scope.repose.renderedFilters = [];

        scope.removeFilter = function(component) {
        $log.info('removeFilter', component)
          scope.newInstance.selectedFilters.splice(scope.repose.componentData.splice(component, 1))
        }

        scope.createInstance = function() {
          $("form").each(function(){
              var elements = $(this).find(':input[xsd-type]');
              //iterate through all elements and get its values
              var data = [];
              angular.forEach(elements, function(element){
                if(element.type === "checkbox"){
                  data.push(
                    {
                      'name': element.name,
                      'value': element.checked,
                      'type': element.attributes['xsd-type'].value,
                      'filter': element.attributes['filter-name'].value
                    }
                  );
                } else {
                  data.push(
                    {
                      'name': element.name,
                      'value': element.value,
                      'type': element.attributes['xsd-type'].value,
                      'filter': element.attributes['filter-name'].value
                    }
                  );
                }
              });

              var modalInstance = $modal.open({
                templateUrl: '/views/create_file_modal.html',
                backdrop: 'static',
                controller: 'ModalInstanceCtrl',
                resolve: {
                  data: function () {
                    return data;
                  },
                  newInstance: function () {
                    return scope.newInstance;
                  }
                }
              });

              modalInstance.result.then(function (status) {
                $log.info('selected item: ', status, $location);
                if(status === "success") {
                  $location.path("/test");
                }
              }, function () {
                $log.info('Modal dismissed at: ' + new Date());
              });
          });
        }

        scope.getComponent = function(){
          $log.info('in getComponent function', scope, element, attrs)
          //scope.ui.componentSelected = true;
          var versionId = scope.newInstance.version;
          var renderedFilters = scope.repose.renderedFilters[versionId];
          var selectedFilters = [];
          if(renderedFilters !== undefined) {
            selectedFilters = scope.newInstance.selectedFilters.filter(function(value) {
              return renderedFilters.indexOf(value) == -1;
            });
          } else {
            selectedFilters = scope.newInstance.selectedFilters;
          }
          $log.info('selected filters: ', scope.newInstance.selectedFilters, selectedFilters, renderedFilters);

          selectedFilters.forEach(function(componentName) {
            ReposeService.getComponents(versionId, componentName)
            .then(function(componentData){
              if(scope.repose.renderedFilters[versionId] === undefined) {
                scope.repose.renderedFilters[versionId] = [];
              }
              scope.ui.componentSelected = true;
              $log.info(componentData);
              scope.componentData = componentData;
              var componentDataLabel = componentName.replace(/-/g,"_") + "_data";
              scope[componentDataLabel] = componentData;

              //for each component, load repose filter...right now it's just one so it's superfulous
              var filter = '<repose-filter name="' + componentName + '" data="{{ ' + componentDataLabel + ' }}" />';
              element.append(filter);

              $compile(element.contents())(scope);
              cleanErrors();
              scope.repose.renderedFilters[versionId].push(componentName);
              scope.repose.version = scope.newInstance.version;
              scope.repose.componentData.push(componentData);
            })
            .catch(function(err){
              $log.error('component directive ReposeService.getComponents::Got an error: ', err);
              $log.error('Set version select to false and empty available filters');
              scope.ui.componentSelected = false;

              scope.repose.availableFilters = [];
              scope.newInstance.selectedFilters = [];
              scope.ui.errorMessage = err;

            });
          })
        };


        function cleanErrors(){
          scope.ui.errorMessage = "";
        }
      }
    };
  });
