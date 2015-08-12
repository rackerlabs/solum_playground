'use strict';

describe('Directive: mainApp', function () {

  // load the directive's module and view
  beforeEach(module('solumApp'));
  beforeEach(module('app/mainApp/mainApp.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<main-app></main-app>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the mainApp directive');
  }));
});