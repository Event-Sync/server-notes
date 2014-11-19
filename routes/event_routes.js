'use strict';

var Event = require('../models/event');
var randomEventId = require('../lib/randomEventId');
var twil = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

// var User = require('..//models/user');

module.exports = function(app){
  //request specific event by id
  app.get('/api/Event/:event_id', function(req, res) {
    console.log(req.params.event_id);
    Event.findOne({event_id: req.params.event_id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });
  //request all events
  app.get('/api/Event', function(req, res) {
    Event.find({}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });
  //update event by _id
  app.put('/api/Event/:event_id', function(req, res) {
    var _event = req.body;
    delete _event._id;
    Event.findOneAndUpdate({event_id: req.params.event_id}, _event, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });
  //delete all events
  app.delete('/api/Event/delete/ALL', function(req, res){
    Event.remove({}, function(err) {
      if (err) return res.status(500).send(err);
      res.json({msg: 'all events deleted'});
    });
  });//delete event by _id
  app.delete('/api/Event/delete/:event_id', function(req, res){
    console.log(req.params.event_id);
    Event.remove({event_id: req.params.event_id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'event deleted'});
    });
  });
  //create new event and send requests to invitee via text
  app.post('/api/newEvent', function(req, res){
    console.log(req.user);
    var newEvent = new Event(req.body);
    console.log(newEvent);
    newEvent.owner_name = req.body.owner_name;
    newEvent.user_phone_number = req.body.user_phone_number;
    newEvent.event_name = req.body.event_name;
    newEvent.event_location = req.body.event_location;
    newEvent.event_time = req.body.event_time;
    var time = newEvent.event_time;
    newEvent.event_id = randomEventId();
    // newEvent.status_code = req.body.events_created.status_code;
    newEvent.invitees = req.body.invitees;
    newEvent.save(function(err, newEvent) {
      if (err) console.log(err);
      var invite = req.body.invitees;
      invite.forEach(function(invitee) {

        var msgObj = invitee.name + ', there is a ' + newEvent.event_name + '. come to the ' + newEvent.event_location + ' on ' + time + ' ? Respond with "y" or "n" only. Secret key: ' + newEvent.event_id;

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

};
