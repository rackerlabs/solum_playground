'use strict';

describe('Service: LanguagePack', function () {

  // load the service's module
  beforeEach(module('solumApp'));

  // instantiate service
  var LanguagePack;
  beforeEach(inject(function (_LanguagePack_) {
    LanguagePack = _LanguagePack_;
  }));

  it('should do something', function () {
    expect(!!LanguagePack).toBe(true);
  });

});
