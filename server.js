var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var twil = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

var passport = require('passport');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

// mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/notes_development');
// app.set('jwtSecret', process.env.JWT_secret || 'changethisordie');


// require('./routes/users_routes')(app, passport);
// require('./routes/notes_routes')(notesRouter);
// app.use('/v1', notesRouter);

// app.use(passport.initialize());

// require('./lib/passport')(passport);
// var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));

// var notesRouter = express.Router();
// notesRouter.use(jwtauth);


require('./routes/event_routes')(app, twil);
// require('./routes/users_routes')(app, passport);
// require('./routes/notes_routes')(notesRouter);
// app.use('/v1', notesRouter);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
console.log('server running on port: %d', app.get('port'));
});
