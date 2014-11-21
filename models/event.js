'use strict';

var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    owner_name: String,
    user_phone_number: String,
    event_name: String,
    event_description: String,
    event_location: String,
    event_time: Date,
    event_id: String,
    // status_code: Number,
    invitees: [
    {
      name: String,
      phone_number: String,
      confirmed: Boolean
    }]

});

module.exports = mongoose.model('Event', eventSchema);
