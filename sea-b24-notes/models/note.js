var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  Name: String,
  Email: String,
  phoneNum: String,
  Event: String,//Location and activity
  Time: Date
});

module.exports = mongoose.model('Invite', noteSchema);
