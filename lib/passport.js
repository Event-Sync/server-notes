'use strict';
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({
    phone_number: 'phone_number',
    password: 'password'
  },
  function(phone_number, password, done) {
    User.findOne({'basic.phone_number': phone_number}, function(err, user) {
      if (err) return done('server error');

      if (!user) return done('access error');

      if (!user.validPassword(password)) return done('access error');

      return done(null, user);
    });
  }));
};
