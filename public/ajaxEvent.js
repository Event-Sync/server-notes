'use strict';

var $ = require('jquery');

module.exports = function(phoneNumber,jwt) {
  var week = 604800000;
  $.ajax({
    type: 'POST',
    url: '/v1/api/newEvent',
    data: {
      jwt: jwt,
      owner_name: 'IM IN',
      user_phone_number: '5555555555',
      event_name: 'STAND UP',
      event_location: 'Codefellows, 2nd Floor',
      event_time: Date.now() - week,
      // status_code: 200,
      invitees: [
        {
          name: 'Johnny',
          phone_number: '+1' + phoneNumber,
          confirmed: false
        }
      ]
    },
    success: function(parsedJson) {
      console.log(parsedJson);
      console.log('success');
    },
    dataType: 'json'
  });
};
