'use strict';

var Event = require('../models/event');
var sendMessage = require('../lib/sendMessage');

module.exports = function(res, event_id, phoneNum) {

  return Event.findOne({event_id: event_id}, function(err, data) {
    var msg;
    if (err) return res.status(500).send(err);
    var invitees = data.invitees;
    for (var i = 0; i < invitees.length; i++) {
        console.log(invitees[i].phone_number, phoneNum);
      if (invitees[i].phone_number === phoneNum) {
        invitees[i].confirmed = true;
        data.save(function(err) {
          if (err) return null;
          msg = 'you are awesome, see you there';
          sendMessage(res, phoneNum, msg)
        });
      } else {
        msg = 'please respond from the phone, the message was sent to';
        sendMessage(res, phoneNum, msg)
      }
    };
  });
}
