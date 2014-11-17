'use strict';

$(document).ready(function() {
  var phoneNumber;
  var name;
  $('#button').click(function() {
    phoneNumber = $('#number').val();
    name = $('#name').val();
    $.ajax({
      type: 'POST',
      url: '/api/newEvent',
      data: {
        owner_name: 'IM IN',
        user_phone_number: '5555555555',
        event_name: 'STAND UP',
        event_location: 'Codefellows, 2nd Floor',
        event_time: Date.now(),
        // status_code: 200,
        invitees: [
          {
            name: name,
            phone_Num: phoneNumber,
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
});
