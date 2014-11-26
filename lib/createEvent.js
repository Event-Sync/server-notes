'use strict';

var Event = require('../models/event');
var randomEventId = require('../lib/randomEventId');

module.exports = function(eventInfo) {
    var newEvent = new Event(eventInfo);
    newEvent.owner_name = eventInfo.owner_name;
    newEvent.user_phone_number = eventInfo.user_phone_number;
    newEvent.event_name = eventInfo.event_name;
    newEvent.description = eventInfo.event_description;
    newEvent.event_location = eventInfo.event_location;
    newEvent.event_time = eventInfo.event_time;
    newEvent.event_id = randomEventId();//creates unique id
    newEvent.invitees = eventInfo.invitees;//an array of objects
    return newEvent;
};
