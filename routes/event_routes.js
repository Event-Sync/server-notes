'use strict';

var Event = require('../models/event');
var User = require('..//models/user');

module.exports = function(app){
  app.post('/api/newEvent', function(req, res){
  var newEvent = new Event(req.body);
    newEvent.event_name = req.body.event_name;
    newEvent.event_location = req.body.event_location;
    newEvent.event_time = req.body.event_time;
    newEvent.status_code = req.body.status_code;
    newEvent.participants = req.body.participants;

  newEvent.save(function(err, data) {
  if (err) return res.status(500).send('server error');
  res.json(data);
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
