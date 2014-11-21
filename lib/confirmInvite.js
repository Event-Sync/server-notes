'use strict';

var Event = require('../models/event');
var sendMessage = require('../lib/sendMessage');

module.exports = function(res, event_id, phoneNum, confirm) {

  return Event.findOne({event_id: event_id}, function(err, data) {
    var msg;
    if (err) return res.status(500).send(err);
    var invitees = data.invitees;
    for (var i = 0; i < invitees.length; i++) {
      if (invitees[i].phone_number === phoneNum) {
        if (confirm === 'y') {
          invitees[i].confirmed = true;
          msg = 'you are awesome, see you there';
        } else {
          invitees[i].confirmed = false;
          msg = 'that is too bad. maybe next time.';
        }
        data.save(function(err) {
          if (err) return null;
          sendMessage(res, phoneNum, msg);
          return
        });
      }
    };
    msg = 'please respond from the phone, the message was sent to';
    sendMessage(res, phoneNum, msg);
    return
  });
}
