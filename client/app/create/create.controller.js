'use strict';

angular.module('solumApp')
  .controller('CreateCtrl', function ($scope, App, $location) {
  $scope.errors = {};
  $scope.app = {};

  $scope.create = function (form) {
    console.log(form);
    console.log('create');
    $scope.submitted = true;

    if (form.$valid) {
      console.log($scope.app)
      App.create({
        app: $scope.app
      })
      .then(function(result){
        console.log('all is saved.  Redirect to building ', result);
        $location.path('/detail/' + result.app.uuid);
      })
      .catch(function(err){
        console.log('errorzzz', err);
      })
      /*
Content-Type: application/yaml
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.headers  - >> Accept: *\/*
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.headers  - >> x-pp-groups: 0;q=1.0
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.headers  - >> Content-Length: 298
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.headers  - >> Connection: Keep-Alive
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.wire  - >> "artifacts:[\n]"
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.wire  - >> "- artifact_type: heroku[\n]"
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.wire  - >> "  content: {href: 'https://github.com/arbor-test/cherrypy-helloworld', private: false}[\n]"
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.wire  - >> "  language_pack: python27[\n]"
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.wire  - >> "  name: test_list_apps_2bbcc3933[\n]"
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.wire  - >> "  run_cmd: python app.py[\n]"
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.wire  - >> "  unittest_cmd: sh unit_tests.sh[\n]"
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.wire  - >> "description: description[\n]"
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.wire  - >> "name: test_list_apps_2[\n]"
2015-06-22 02:37:27,398 1585918252 [repose:repose] DEBUG org.apache.http.wire  - >> "version: 1[\n]"      
      
      
      */
    }
  };

});