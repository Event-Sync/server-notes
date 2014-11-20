'use strict';
var User = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(secret, req, res) {
  return function(req, res, next) {
    if (req.query.jwt) {
      var token = req.query.jwt;
    } else {
      var token = req.body.jwt || req.headers.jwt;
    }
    console.log(token);

    var decoded;
    try {
      decoded = jwt.decode(token, secret);
    } catch(err) {
      console.log(err);
      return res.status(403).send('access denied');
    }

    User.findOne({_id: decoded.iss}, function(err, user) {
      if (err) return res.status(403).send('access denied');
      if (!user) return res.status(403).send('access denied');

      req.user = user;
      next();
    });
 };
};
