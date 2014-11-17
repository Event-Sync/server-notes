'use strict';

var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    owner_name: String,
    phone_number: String,
    event_name: String,
    event_location: String,
    event_time: Date,
    status_code: Number,
    invitees: [
    {
      name: String,
      part_num: String
    }]

});

module.exports = mongoose.model("Event", eventSchema);
