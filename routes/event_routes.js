'use strict';

var Event = require('../models/event');
var sendMessage = require('../lib/sendMessage');
var numFormat = require('../lib/numFormat')();
var createEvent = require('../lib/createEvent');

// var User = require('..//models/user');
module.exports = function(app) {
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
    var eventId = req.body.event_id;
    var change = req.body.change;
    Event.findOneAndUpdate({event_id: eventId }, change, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });
  //delete all events
  app.delete('/api/event/delete/ALL', function(req, res) {
    Event.remove({}, function(err) {
      if (err) return res.status(500).send(err);
      res.json({msg: 'all events deleted'});
    });
  });//delete event by _id
  app.delete('/api/event/delete', function(req, res) {
    Event.remove({event_id: req.body.event_id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'event deleted'});
    });
  });
  //create new event and send requests to invitee via text
  app.post('/api/newEvent', numFormat, function(req, res) {
    var phoneNum;
    var newEvent = createEvent(req.body);
    var time = newEvent.event_time;
    newEvent.save(function(err, newEvent) {
      if (err) return console.log(err);
      var invite = req.body.invitees;
      invite.forEach(function(invitee) {//iterates through each invite to send message
        var msg = invitee.name + ', ' + newEvent.event_name + '. come to the ' + newEvent.event_location + ' on ' + time + ' ? "y" or "n" and Secret key >>>. ' + newEvent.event_id;
        phoneNum = invitee.phone_number;
        sendMessage(res, phoneNum, msg);
      });
      res.json(newEvent);
    });
  });
};
