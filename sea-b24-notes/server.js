var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/notes_development');

require('./routes/notes_routes')(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
