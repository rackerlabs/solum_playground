'use strict';

angular.module('solumApp')
  .filter('LanguagePackFilter', function () {
  var language_packs = [
    {
      'id': 'python27',
      'image': 'http://www.philipbjorge.com/bioinformatics-presentation/assets/python-logo.png'
    }
  ];

  return function (input) {
    var lp = language_packs.filter(function(lp){
      return lp.id == input;
    });
    if(lp.length > 0){
      return lp[0].image;
    } else {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Papyrus_Ani_curs_hiero.jpg/310px-Papyrus_Ani_curs_hiero.jpg";
    }
  };
});
