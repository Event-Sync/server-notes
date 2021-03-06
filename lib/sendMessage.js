'use strict';

var twil = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);
//sends sms message from local twilio num
module.exports = function(res, phoneNum, msg) {
  twil.sms.messages.create({
    to: phoneNum,
    from: process.env.TWILIONUM,
    body: msg
  },
  function(err, sms) {
    if (err) {
      console.log(err, phoneNum, msg);
      return res.status(500).send('something went wrong');
    }
    console.log(sms);
    return 'success';
  });
};
