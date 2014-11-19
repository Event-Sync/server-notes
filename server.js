'use strict';
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var passport = require('passport');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/events_development');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
})
app.set('jwtSecret', process.env.JWT_secret || 'changethisordie');

app.use(passport.initialize());

require('./lib/passport')(passport);
var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));

var eventsRouter = express.Router();
eventsRouter.use(jwtauth);

require('./routes/users_routes')(app);
require('./routes/event_routes')(eventsRouter);
app.use('/v1', eventsRouter);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
console.log('server running on port: %d', app.get('port'));
});
