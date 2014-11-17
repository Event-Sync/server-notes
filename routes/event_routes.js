'use strict';

var Event = require('../models/event');
var User = require('..//models/user');

module.exports = function(app, twil){
  app.post('/api/newEvent', function(req, res){
    var newEvent = new Event(req.body);
    newEvent.event_name = req.body.event_name;
    newEvent.event_location = req.body.event_location;
    newEvent.event_time = req.body.event_time;
    // newEvent.status_code = req.body.events_created.status_code;
    newEvent.invitees = req.body.invitees;
    newEvent.pre('save', function(next) {
      next(err);
    });

    var events = req.body;
    var invite = req.body.invitees;
    invite.forEach(function(invitee) {
      var msgObj = invitee.name + ', I am having a ' + events.event_name + '. Would you like to come to the ' + events.event_location + ' on ' + events.event_time + ' ? Please respond with "y" or "n" only.';
      twil.sendMessage({
        to: '+1' + invitee.phone_Num,
        from: process.env.TWILIONUM,
        body: msgObj,
        statusCallback: function(err) {
          console.log('it worked');
          }
      }),
      function(err, message) {
        if (err) return res.status(500).send('something went wrong');
        // console.log(message.sid);
      };
    console.log(newEvent);
    res.json(newEvent);
    });

  });

  app.get('/api/Event/_id', function(req, res){
    Event.findOneAndUpdate({'_id': req.params.id}, Event, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.delete('/api/delete/_id', function(req, res){
    Event.remove({'_id': req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'success!'});
});
});

};
