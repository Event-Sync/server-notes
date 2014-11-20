'use strict';

var User = require('../models/user');

module.exports = function(app, jwtauth) {
  app.post('/login', function(req, res) {
    var phone_number = req.body.phone_number;
    var password = req.body.password;

    User.findOne({phone_number: phone_number}, function(err, user) {
      if (err) res.send('server error');

      if (!user) res.send('access error');

      if (!user.validPassword(password)) res.send('access error');

    res.json({user: user, jwt: user.generateToken(app.get('jwtSecret'))});
    });
  });

  app.post('/login/newUser', function(req, res){
    var newUser = new User(req.body);
    newUser.name = req.body.name;
    newUser.phone_number = req.body.phone_number;
    if(req.body.password.length <= 4) return res.status(500).send('Password must be at least 5 charecters long');
    newUser.password = newUser.generateHash(req.body.password);
    newUser.save(function(err) {
      if (err) return res.status(500).send('server error');
      res.json({'jwt': newUser.generateToken(app.get('jwtSecret'))});
    });
  });
  //delete single user
  app.delete('/user/delete', jwtauth, function(req, res){
    User.remove({name: req.body.name}, function(err) {
      if (err) return res.status(500).send('server error');
      res.json({msg: 'user deleted'});
    });
  });
};
