'use strict';

describe('Directive: appCard', function () {

  // load the directive's module and view
  beforeEach(module('solumApp'));
  beforeEach(module('app/appCard/appCard.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<app-card></app-card>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the appCard directive');
  }));
});