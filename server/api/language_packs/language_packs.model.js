'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LanguagePacksSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('LanguagePacks', LanguagePacksSchema);