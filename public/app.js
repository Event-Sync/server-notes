'use strict';

$(document).ready(function() {
  var phoneNumber;
  var name;
  $('#button').click(function() {
    phoneNumber = $('#number').val();
    name = $('#name').val();
    console.log(phoneNumber, name);
    $.ajax({
      type: 'POST',
      url: '/api/newEvent',
      data: {
        events_created: {
          event_name: 'Im In Meeting',
          event_location: 'Codefellows, 2nd Floor',
          event_time: Date.now(),
          invitees: [
            {
              name: name,
              phone_Num: '+1' + phoneNumber,
              coming: false
            }
          ]
        }
      },
      success: function(parsedJson) {
        console.log(parsedJson);
        console.log('success');
      },
      dataType: 'json'
    });
  });
});
