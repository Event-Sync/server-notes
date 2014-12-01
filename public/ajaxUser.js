'use strict';

var $ = require('jquery');

module.exports = function() {
  $.ajax({
    type: 'POST',
    url: '/login/newUser',
    data: {
      name: 'Evan',
      phone_number: '2068397850',
      password: 'winter'
    },
    success: function(parsedJson) {
      console.log(parsedJson);
      console.log('success');
    },
    dataType: 'json'
  });
};
