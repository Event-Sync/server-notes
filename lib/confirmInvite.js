'use strict';

var Event = require('../models/event');

module.exports = function(res, event_id, phoneNum, confirm) {
//confirms user was invited and updates database
  return Event.findOne({event_id: event_id}, function(err, data) {
    if (err) return res.status(500).send(err);

    var msg;
    var invitees = data.invitees;//array of invitees
    for (var i = 0; i < invitees.length; i++) {
      if (invitees[i].phone_number === phoneNum) {//compares response phoneNum
        if (confirm === 'y') {                    //with nums in invitee array
          invitees[i].confirmed = true;
        } else {
          invitees[i].confirmed = false;
        }
        data.save(function(err) {
          if (err) return res.status(500).send('db error');
          return
        });
      }
    };
  });
}
