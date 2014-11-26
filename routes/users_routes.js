'use strict';

var User = require('../models/user');
var createUser = require('../lib/newUser');

module.exports = function(app, jwtauth) {
  //verifies user and responds with jwt
  app.post('/login', function(req, res) {
    var phoneNumber = req.body.phone_number;
    var password = req.body.password;

    User.findOne({phone_number: phoneNumber}, function(err, user) {
      if (err) return res.status(404).send('server error');

      if (!user) return res.status(404).send('access error');

      if (!user.validPassword(password)) res.status(404).send('access error');

      res.json({jwt: user.generateToken(app.get('jwtSecret'))});
    });
  });
  //crates a new user and responds with jwt
  app.post('/login/newUser', function(req, res) {
    var regex = /[a-zA-Z0-9_]{5,}/;
    if (!regex.test(req.body.password)) return res.status(500).send('Only numbers and letters and underscores');
    var newUser = createUser(req.body);
    newUser.save(function(err) {
      if (err) return res.status(500).send('server error');
      res.json({jwt: newUser.generateToken(app.get('jwtSecret'))});
    });
  });
  //delete single user by name
  app.delete('/user/delete', jwtauth, function(req, res) {
    User.remove({name: req.body.name}, function(err) {
      if (err) return res.status(500).send('server error');
      res.json({msg: 'user deleted'});
    });
  });
};
