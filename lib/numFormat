'use strict';

module.exports = function() {
  //ensures phone number is in correct format (+1**********)
  return function(req, res, next) {
    for (var i = 0; i < req.body.invitees.length; i++) {
      if (!/^\+1[0-9]{10}/.test(req.body.invitees[i].phone_number)) {
        return res.status(400).send('wrong # format');
      }
    };
    next();
  };
};
