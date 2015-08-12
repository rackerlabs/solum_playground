'use strict';

describe('Directive: parametersApp', function () {

  // load the directive's module and view
  beforeEach(module('solumApp'));
  beforeEach(module('app/parametersApp/parametersApp.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<parameters-app></parameters-app>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the parametersApp directive');
  }));
});