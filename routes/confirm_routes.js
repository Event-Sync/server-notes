'use strict';

var Event = require('../models/event');
var twil = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

module.exports = function(app) {
//update confirmed field for a specific invitee
  app.post('/api/Event/confirm', function(req, res){
    var text = req.body;
    var textBody = text.Body.toLowerCase().split(' ');
    console.log(typeof textBody);
    var y = false;
    var n = false;
    var _idPresent = false;
    var _id;
    var msgObj = 'please enter "y" or "n"';
    for (var i = 0; i < textBody.length(); i++) {
      if (textBody[i] === 'y') y = true;
      if (textBody[i] === 'n') n = true;
      if (/^[a-z]{5}[0-9]{2}$/.test(textBody[i])) {
        event_id = textBody[i];
        _idPresent = true;
      }
    }
    if ((y) && (_id) && (n)) {
      msgObj = 'please only choose "y" OR "n" and your confirmation number';
    } else if (n) {
      msgObj = 'that is too bad. maybe next time.';
    } else if ((y) && (_id)) {
      msgObj = 'you are awesome, see you there!';
      var confirm = {confirmed: true}
      Event.findOneAndUpdate({event_id: event_id, invitees: {phone_Num: text.From}}, confirm, function(err, data) {
        if (err) return res.status(500).send(err);
        twil.sms.messages.create({
          to: text.From,
          from: process.env.TWILIONUM,
          body: msgObj,
        },
        function(err, sms) {
          if (err) return res.status(500).send('something went wrong');
          console.log(sms);
        });
        res.json(data);
      });
    } else {
    msgObj = 'something did not work. please try again. please choose "y" or "n" and copy in your confirmation number above';
    }
    twil.sms.messages.create({
      to: text.From,
      from: process.env.TWILIONUM,
      body: msgObj,
    },
    function(err, sms) {
      if (err) return res.status(500).send('something went wrong');
      console.log(sms);
    });
    res.json(data);

  });
};
