'use strict';

var Event = require('../models/event');
// var User = require('..//models/user');

module.exports = function(app, twil){
  app.get('/api/Event/:_id', function(req, res) {
    console.log(req.params._id);
    Event.findOne({_id: req.params._id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.get('/api/Event', function(req, res) {
    Event.find({}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  // app.put('/api/Event/_id', function(req, res) {
  //   var _event = req.body;
  //   delete _event._id;
  //   Event.findOneAndUpdate({_id: req.params.id}, _event, function(err, data) {
  //     if (err) return res.status(500).send('there was an error');
  //     res.json(data);
  //   });
  // });

  app.delete('/api/Event/delete/:_id', function(req, res){
    console.log(req.params._id);
    Event.remove({_id: req.params._id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'success!'});
    });
  });

  app.post('/api/newEvent', function(req, res){
    console.log(req.body);
    var newEvent = new Event(req.body);
    console.log(newEvent);
    newEvent.owner_name = req.body.owner_name;
    newEvent.user_phone_number = req.body.user_phone_number;
    newEvent.event_name = req.body.event_name;
    newEvent.event_location = req.body.event_location;
    newEvent.event_time = req.body.event_time;
    newEvent.event_time = req.body.event_id;
    // newEvent.status_code = req.body.events_created.status_code;
    newEvent.invitees = req.body.invitees;
    newEvent.save(function(err, newEvent) {
      if (err) console.log(err);
      var events = req.body;
      var invite = req.body.invitees;
      invite.forEach(function(invitee) {
        var msgObj = invitee.name + ', I am having a ' + events.event_name + '. Would you like to come to the ' + events.event_location + ' on ' + events.event_time + ' ? Please respond with "y" or "n" only.';
        twil.sms.messages.create({
          to: '+1' + invitee.phone_Num,
          from: process.env.TWILIONUM,
          body: msgObj,
        },
        function(err, sms) {
          if (err) return res.status(500).send(err);
          // console.log(message.sid);
          console.log(sms);
          res.json(newEvent);
        });
      });
    });
  });

  // app.post('/api/Event/confirm', function(req, res){
  //   var text = req.body;
  //   var textBody = text.Body.toLowerCase().split(' ');
  //   var y = false;
  //   var n = false;
  //   var _idPresent = false;
  //   var _id;
  //   var msgObj = '';
  //   for (var i = 0; i < textBody.length(); i++) {
  //     if (textBody[i] === 'y') y = true;
  //     if (textBody[i] === 'n') n = true;
  //     if (textBody[i].typeOf() === 'number') {
  //       _id = textBody[i];
  //       _idPresent = true;
  //     }
  //   }
  //   if ((y) && (_id) && (n)) {
  //     msgObj = 'please only choose "y" OR "n" and your confirmation number';
  //   } else if (n) {
  //     msgObj = 'that is too bad. maybe next time.';
  //   } else if ((y) && (_id)) {
  //     msgObj = 'you are awesome, see you there!';
  //     Event.find({'_id': _id}, function(err, data) {
  //       if (err) return res.status(500).send('there was an error');
  //       data.confirmed = true;// what do we need to do to save this?
  //     });
  //   } else {
  //     msgObj = 'something did not work. please try again. please choose "y" or "n" and copy in your confirmation number above';
  //   }
  //   twil.sms.messages.create({
  //     to: text.From,
  //     from: process.env.TWILIONUM,
  //     body: msgObj,
  //   },
  //     function(err, sms) {
  //       if (err) return res.status(500).send('something went wrong');
  //       console.log(sms);
  //     });

  // });

};
