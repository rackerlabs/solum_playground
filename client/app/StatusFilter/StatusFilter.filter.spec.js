'use strict';

describe('Filter: StatusFilter', function () {

  // load the filter's module
  beforeEach(module('solumApp'));

  // initialize a new instance of the filter before each test
  var StatusFilter;
  beforeEach(inject(function ($filter) {
    StatusFilter = $filter('StatusFilter');
  }));

  it('should return the input prefixed with "StatusFilter filter:"', function () {
    var text = 'angularjs';
    expect(StatusFilter(text)).toBe('StatusFilter filter: ' + text);
  });

});
