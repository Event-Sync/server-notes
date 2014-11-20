'use strict';

var Event = require('../models/event');
var randomEventId = require('../lib/randomEventId');
var sendMessage = require('../lib/sendMessage');

// var User = require('..//models/user');

module.exports = function(app){
  app.get('/api/event/', function(req, res) {
    Event.find({}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });
  //request specific event by id

  app.get('/api/event/:event_id', function(req, res) {
    Event.findOne({event_id: req.params.event_id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  //update event by _id
  app.put('/api/event/put', function(req, res) {
    var event_id = req.body.event_id;
    var change = req.body.change;
    Event.findOneAndUpdate({event_id: event_id }, change, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });
  //delete all events
  app.delete('/api/event/delete/ALL', function(req, res){
    Event.remove({}, function(err) {
      if (err) return res.status(500).send(err);
      res.json({msg: 'all events deleted'});
    });
  });//delete event by _id
  app.delete('/api/event/delete', function(req, res){
    Event.remove({event_id: req.body.event_id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'event deleted'});
    });
  });
  //create new event and send requests to invitee via text
  app.post('/api/newEvent', function(req, res){
    var phoneNum;
    var newEvent = new Event(req.body);
    newEvent.owner_name = req.body.owner_name;
    newEvent.user_phone_number = req.body.user_phone_number;
    newEvent.event_name = req.body.event_name;
    newEvent.description = req.body.event_description;
    newEvent.event_location = req.body.event_location;
    newEvent.event_time = req.body.event_time;
    var time = newEvent.event_time;
    newEvent.event_id = randomEventId();
    // newEvent.status_code = req.body.events_created.status_code;
    newEvent.invitees = req.body.invitees;
    newEvent.save(function(err, newEvent) {
      if (err) return console.log(err);
      var invite = req.body.invitees;
      invite.forEach(function(invitee) {
        var msg = invitee.name + ', there is a ' + newEvent.event_name + '. come to the ' + newEvent.event_location + ' on ' + time + ' ? Respond with "y" or "n" only. Secret key: ' + newEvent.event_id;
        phoneNum = '+1' + invitee.phone_Num;
        sendMessage(phoneNum, msg);
      });
      res.json(newEvent);
    });
  });

};
