'use strict';

describe('Directive: mainCodeDetail', function () {

  // load the directive's module and view
  beforeEach(module('solumApp'));
  beforeEach(module('app/mainCodeDetail/mainCodeDetail.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<main-code-detail></main-code-detail>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the mainCodeDetail directive');
  }));
});