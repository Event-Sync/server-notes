'use strict';

var eventSchema = mongoose.Schema({
  Event: {
    Name: String,
    time: String,
    location: String,
    invitees: {
      name: String,
      phoneNum: String,
      coming: Boolean,
    },
  }
});

module.exports = mongoose.model("Event", eventSchema);
