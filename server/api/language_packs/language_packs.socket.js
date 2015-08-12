/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var LanguagePacks = require('./language_packs.model');

exports.register = function(socket) {
  LanguagePacks.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  LanguagePacks.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('language_packs:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('language_packs:remove', doc);
}