'use strict';

var eventSchema = mongoose.Schema({
  Event: {
    Name: String,
    time: String,
    location: String,
    invitees: {
      name: Number,
      name: Number,
      name: Number,
    },
    participants: Number

  }
});

module.exports = mongoose.model("Event", eventSchema);
