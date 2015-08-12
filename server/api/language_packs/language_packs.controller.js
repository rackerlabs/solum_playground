'use strict';

var _ = require('lodash');
var LanguagePacks = require('./language_packs.model');
var request = require('request');

// Get list of language_packs
exports.index = function (req, res) {
  console.log('user: ', req.user);

  console.log('get list of language packs from solum');
  var language_pack_options = {
    url: 'https://dfw.solum.api.rackspacecloud.com/v1/language_packs',
    method: 'GET',
    headers: {
      'X-Auth-Token': req.user.raxToken
    }
  };

  request(language_pack_options, function (error, response, body) {
    if (response !== undefined && error === null) {
      switch (response.statusCode) {
        case 200:
          return res.json(200, JSON.parse(body));
        case 401:
          return handleError(res, 'Invalid credentials');
        case 500:
          return handleError(res, 'App list retrieval failed');
        default:
          return handleError(res, 'App list retrieval failed');
      }
    } else {
      return handleError(res, 'App list retrieval failed');
    }
  });
};

// Get a single language_packs
exports.show = function (req, res) {
  LanguagePacks.findById(req.params.id, function (err, language_packs) {
    if (err) { return handleError(res, err); }
    if (!language_packs) { return res.send(404); }
    return res.json(language_packs);
  });
};

// Creates a new language_packs in the DB.
exports.create = function (req, res) {
  LanguagePacks.create(req.body, function (err, language_packs) {
    if (err) { return handleError(res, err); }
    return res.json(201, language_packs);
  });
};

// Updates an existing language_packs in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  LanguagePacks.findById(req.params.id, function (err, language_packs) {
    if (err) { return handleError(res, err); }
    if (!language_packs) { return res.send(404); }
    var updated = _.merge(language_packs, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, language_packs);
    });
  });
};

// Deletes a language_packs from the DB.
exports.destroy = function (req, res) {
  LanguagePacks.findById(req.params.id, function (err, language_packs) {
    if (err) { return handleError(res, err); }
    if (!language_packs) { return res.send(404); }
    language_packs.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
