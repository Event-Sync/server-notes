'use strict';

$(document).ready(function() {
  var phoneNumber;
  var jwt;
  $('#button').click(function() {
    phoneNumber = $('#number').val();
    jwt = $('#name').val();
    $.ajax({
      type: 'POST',
      url: '/v1/api/newEvent',
      data: {
        jwt: jwt,
        owner_name: 'IM IN',
        user_phone_number: '5555555555',
        event_name: 'STAND UP',
        event_location: 'Codefellows, 2nd Floor',
        event_time: Date.now(),
        // status_code: 200,
        invitees: [
          {
            name: 'Johnny',
            phone_Num: '+1' + phoneNumber,
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
  });
  $('#user').click(function() {
    $.ajax({
      type: 'POST',
      url: '/login/newUser',
      data: {
        name: 'Jacob',
        phone_number: '4444444444',
        password: 'newtest'
      },
      success: function(parsedJson) {
        console.log(parsedJson);
        console.log('success');
      },
      dataType: 'json'
    });
  });
});
