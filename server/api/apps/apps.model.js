'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AppsSchema = new Schema({
  name: String,
  description: String,
  active: Boolean,
  uuid: String,
  uri: String,
  raxTenant: String,
  raxToken: String,
  status: String,
  created_at: String,
  updated_at: String,
  application_uri: String,
  plan_id: String
});

AppsSchema.statics.updateStatus = function updateStatus (id, status, updated_at, application_uri, cb) {
  this.findOne({_id: id }, function(err, doc){
    doc.status = status;
    doc.updated_at = updated_at;
    doc.application_uri = application_uri;
    doc.save(cb);
  });
};

module.exports = mongoose.model('Apps', AppsSchema);