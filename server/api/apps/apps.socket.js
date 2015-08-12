/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Apps = require('./apps.model');

exports.register = function(socket) {
  Apps.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Apps.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  console.log('on save', doc.plan_id)
  socket.emit('app_status:' + doc.plan_id + ':save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('apps:remove', doc);
}