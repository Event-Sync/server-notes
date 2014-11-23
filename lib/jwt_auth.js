'use strict';
var User = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(secret) {
  return function(req, res, next) {
    //pulls in jwt wherever it's sent
    var token = req.query.jwt || req.body.jwt || req.headers.jwt;

    var decoded;
    //pulls info out of jwt
    try {
      decoded = jwt.decode(token, secret);
    } catch(err) {
      console.log(err);
      return res.status(403).send('access denied');
    }
    //verifies jwt is valid
    User.findOne({_id: decoded.iss}, function(err, user) {
      if (err) return res.status(403).send('access denied');

      if (!user) return res.status(403).send('access denied');

      if (decoded.expires < Date.now()) return res.status(403).send('please login');

      req.user = user;

      next();
    });
  };
};
