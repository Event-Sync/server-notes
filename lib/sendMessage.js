'use strict';

var twil = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

module.exports = function(phoneNum, msg) {
  twil.sms.messages.create({
    to: phoneNum,
    from: process.env.TWILIONUM,
    body: msg
  },
  function(err, sms) {
    if (err) return res.status(500).send('something went wrong');
    console.log(sms);
    return 'success';
  });
};
