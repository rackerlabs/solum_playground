'use strict';

angular.module('solumApp')
  .factory('LanguagePack', function (Auth, $http) {
  // Service logic
  // ...

  var meaningOfLife = 42;

  // Public API here
  return {
    getLanguagePacks: function (cb) {
      var authToken = Auth.getToken();
      $http.get('/api/language_packs', {
        authToken: authToken
      }).
        success(function (data) {
        return cb(data);
      }).
        error(function (err) {
        return cb(err);
      });
    }
  };
});
