'use strict';

var Event = require('../models/event');
var sendMessage = require('../lib/sendMessage');

module.exports = function(res, event_id, phoneNum, confirm) {
//confirms user was invited and sends appropriate message
  return Event.findOne({event_id: event_id}, function(err, data) {
    if (err) return res.status(500).send(err);

    var msg;
    var invitees = data.invitees;//array of invitees
    for (var i = 0; i < invitees.length; i++) {
      console.log(invitees[i].phone_number, phoneNum)
      if (invitees[i].phone_number === phoneNum) {//compares response phoneNum
        if (confirm === 'y') {                    //with nums in invitee array
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
  });
}
