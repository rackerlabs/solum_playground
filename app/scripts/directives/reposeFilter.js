'use strict';

/**
 * Directive that loads repose filter
 */

angular.module('reposePlaygroundApp')
  .directive('reposeFilter', function ($log, $compile) {
    return {
      templateUrl: 'views/reposeFilter.html',
      restrict: 'E',
      // isolated scope? maybe later
      scope: {
        data: '@'
      },
      link: function (scope, element, attrs) {
        $log.log('in repose filter directive', scope, element, attrs);
        var filterData = JSON.parse(scope.data);
        var filterName = attrs.name;
        //var filterData = JSON.parse(attrs.data);
        //let's find all attributes
        for(var key in filterData){
          switch(key){
            case 'doc':
              //we take care of it in the name
              break;
            case 'name':
              var label = '<repose-label prefix="" value="' +
                 filterData[key] +
                   '" doc="' + filterData.doc + 
                   '" reposetitle="true" />';
              element.children().append(label);
              break;
            case 'items':
              //make sure this is not a list item
              if(!filterData.type || filterData.type !== 'list'){
                for(var item = 0, max_items = filterData.items.length; item < max_items; item ++ ){
                  var name = filterData.name.replace(/-/g,'_') + '_items' + item; // - not allowed in data :()
                  scope[name] = filterData[key][item];
                  var items = '<repose-item filter-name="' + filterName + '" prefix="' + filterData.name + 
                    '." data="{{ ' + name + ' }}"/>';
                  console.log('test prefix', items)
                    
                  element.children().append(items);
                }
              }
              break;
            default:
              $log.error(key + ' not found');
          }
        }
        $compile(element.contents())(scope);
      }
    };
  });
