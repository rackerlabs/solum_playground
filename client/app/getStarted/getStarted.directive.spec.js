'use strict';

describe('Directive: getStarted', function () {

  // load the directive's module and view
  beforeEach(module('solumApp'));
  beforeEach(module('app/getStarted/getStarted.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<get-started></get-started>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the getStarted directive');
  }));
});