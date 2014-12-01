'use strict';

var $ = require('jquery');
var ajaxUser = require('./ajaxUser');
var ajaxEvent = require('./ajaxEvent');
// testing app for web (will expand to full usable site)
$(document).ready(function() {
  var phoneNumber;
  var jwt;
  $('#button').click(function() {
    phoneNumber = $('#number').val();
    jwt = $('#name').val();
    ajaxEvent(phoneNumber, jwt);

  });
  $('#user').click(function() {
    ajaxUser();

  });
});
