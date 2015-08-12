'use strict';

describe('Filter: AppStatusFilter', function () {

  // load the filter's module
  beforeEach(module('solumApp'));

  // initialize a new instance of the filter before each test
  var AppStatusFilter;
  beforeEach(inject(function ($filter) {
    AppStatusFilter = $filter('AppStatusFilter');
  }));

  it('should return the input prefixed with "AppStatusFilter filter:"', function () {
    var text = 'angularjs';
    expect(AppStatusFilter(text)).toBe('AppStatusFilter filter: ' + text);
  });

});
