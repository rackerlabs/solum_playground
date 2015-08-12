'use strict';

describe('Directive: workflowApp', function () {

  // load the directive's module and view
  beforeEach(module('solumApp'));
  beforeEach(module('app/workflowApp/workflowApp.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<workflow-app></workflow-app>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the workflowApp directive');
  }));
});