'use strict';

/**
 * Directive that loads each item
 */
angular.module('reposePlaygroundApp')
  .directive('reposeItem', function ($log, $compile) {
    return {
      templateUrl: 'views/reposeItem.html',
      restrict: 'E',
      scope: {
        data: '@'
      },
      link: function (scope, element, attrs) {
        $log.log('in repose item directive', scope, element, attrs);
        var filterData = JSON.parse(scope.data);
        var prefix = attrs.prefix;
        var filterName = attrs.filterName;
        //let's find all attributes
        for(var key in filterData){
          switch(key){
            case 'minOccurs':
              //superfluous.  Taking care of it in required.
            case 'maxOccurs':
              //superfluous.  Taking care of it in required or items[list].
            case 'required':
              //we take care of it in the name
            case 'doc':
              //we take care of it in the name
              break;
            case 'name':
              //unless there's a radio type...in that case, forward it away to somewhere else
              if(!filterData.type || filterData.type !== 'radio') {
                var label = '<repose-label value="' +
                   filterData[key] + '" required="' +
                     (filterData.required !== undefined && filterData.required === "required") +
                     '" doc="' + filterData.doc + '"/>';
                element.children().append(label);
              }
              break;
            case 'items':
              //make sure this is not a list item
              if(!filterData.type || filterData.type !== 'list'){
                for(var item = 0, max_items = filterData.items.length; item < max_items; item ++ ){
                  var name = filterData.name.replace(/-/g,'_') + '_items' + item; // - not allowed in data :()
                  scope[name] = filterData[key][item];
                  var items = '<repose-item filter-name="' + filterName + '" prefix="' + prefix + 
                    filterData.name + '." data="{{ ' + name + ' }}"/>';
                  element.children().append(items);
                }
              }
              break;
            case 'type':
              //types can be many.  so we do a switch in a switch like a good like newbie
              switch(filterData.type){
                case 'list':
                  //it's a list
                  var table_name = filterData.name.replace(/-/g,'_') + '_listitems';
                  scope[table_name] = filterData.items;
                  var table = '<repose-table filter-name="' + filterName + '" prefix="' + prefix + 
                   filterData.name + '." data="{{ ' + table_name + ' }}" required="' +
                   (filterData.required !== undefined && filterData.required === "required") +
                   '" maxoccurs="' + filterData.maxOccurs + '"/>';
                  element.children().append(table);
                  break;
                case 'string':
                  //TODO: check if there's an xsd-type associated with it.  if so, add ng-model
                  var string = '<input filter-name="' + filterName + '" name="' + prefix + filterData.name + 
                    '" type="text" xsd-type="string" value="this is coming from repose item.  should be different" />';
                  element.children().append(string);
                  break;
                case 'anyURI':
                  //TODO: check if there's an xsd-type associated with it.  if so, add ng-model
                  var anyURI = '<input filter-name="' + filterName + '" xsd-type="' + filterData.type + 
                    '" type="url" name="' + prefix + filterData.name + 
                    ' value="this is coming from repose item.  should be different" />';
                  element.children().append(anyURI);
                  break;
                case 'boolean':
                  //TODO: check if there's an xsd-type associated with it.  if so, add ng-model
                  break;
                case 'double':
                  //TODO: check if there's an xsd-type associated with it.  if so, add ng-model
                  var double = '<slider filter-name="' + filterName + '" name="' + prefix + filterData.name + 
                    '" xsd-type="double" ng-model="element.name" min="' + filterData.minInclusive + '" ' +
                    'step="0.1" max="' + filterData.maxInclusive + '" value="' + filterData.default + '"></slider>'
                  element.children().append(double)
                  break;
                case 'radio':
                  //TODO: check if there's an xsd-type associated with it.  if so, add ng-model
                  var radio = '<label prefix="' + prefix + filterData.name + 
                    '" class="rs-radio"><input type="radio" name="' + prefix + filterData.name + 
                    '" xsd-type="radio"><strong>' +
                    filterData.name + '</strong><br><span class="rs-help-block">' + filterData.doc +
                    '</span></label>';
                  element.children().append(radio)
                  break;
                default:
                  $log.error(filterData.type + ' not found');
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
