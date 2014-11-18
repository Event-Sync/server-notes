'use strict';

var User = require('../models/user');

module.exports = function(app, passport) {
app.get('/login', passport.authenticate('basic', {session: false}), function(req, res){
      res.json({'jwt': req.user.generateToken(app.get('jwtSecret'))});
    });

  app.post('/login', function(req, res) {
    User.findOne({'basic.phone_number': req.body.phone_number}, function(err, user) {
      if (err) return res.status(500).send('server error');
      if (user) return res.send('user already exsits');
      if (req.body.password !== req.body.confirmPassword)
      return res.status(500).send('invalid password');
});
});

  app.get('/login/newUser', function(req, res){
    var newUser = new User();
    newUser.basic.name = req.body.name;
    newUser.basic.phone_number = req.body.phone_number;
    console.log(req.body);
    if(req.body.password.length <= 4) return res.status(500).send('Password must be at least 5 charecters long');
    newUser.basic.password = newUser.generateHash(req.body.password);
    newUser.save(function(err, data) {
      if (err) return res.status(500).send('server error');
      res.json({'jwt': newUser.generateToken(app.get('jwtSecret'))});
    });
  });


  //app.post('/login/newUser',function(req, res){

  //});







};
