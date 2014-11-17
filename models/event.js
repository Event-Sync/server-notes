'use strict';

var eventSchema = mongoose.Schema({
    owner_name: String,
    phone_number: String,
    event_name: String,
    event_location: String,
    event_time: Date,
    status_code: Number,
    participants: [
    {
      name: String,
      part_num: String
    }]

});

module.exports = mongoose.model("Event", eventSchema);
