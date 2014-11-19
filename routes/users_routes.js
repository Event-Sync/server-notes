'use strict';

var User = require('../models/user');

module.exports = function(app) {
  app.get('/login', function(req, res) {
    console.log(req.body);
    var phone_number = req.body.phone_number;
    var password = req.body.password;

    User.findOne({phone_number: phone_number}, function(err, user) {
      if (err) res.send('server error');

      if (!user) res.send('access error');
      console.log(password);
      if (!user.validPassword(password)) res.send('access error');

    res.json({'jwt': user.generateToken(app.get('jwtSecret'))});
    });
  });

  app.post('/login/newUser', function(req, res){
    console.log(req.body);
    var newUser = new User(req.body);
    newUser.name = req.body.name;
    newUser.phone_number = req.body.phone_number;
    console.log(req.body);
    if(req.body.password.length <= 4) return res.status(500).send('Password must be at least 5 charecters long');
    newUser.password = newUser.generateHash(req.body.password);
    newUser.save(function(err, data) {
      if (err) return res.status(500).send('server error');
      res.json({'jwt': newUser.generateToken(app.get('jwtSecret'))});
    });
  });


  app.delete('/User/delete/:_id', function(req, res){
    console.log(req.params._id);
    User.remove({_id: req.params._id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'user deleted'});
    });
  });
};
