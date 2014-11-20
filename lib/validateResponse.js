'use strict';

var confirmInvite = require('../lib/confirmInvite');
var sendMessage = require('../lib/sendMessage');

module.exports = function(res, phoneNum, textString) {
  var textArray = textString.toLowerCase().split(' ');
  var y = false;
  var n = false;
  var _idPresent = false;
  var event_id;
  var msg;
  for (var i = 0; i < textArray.length; i++) {
    if (textArray[i] === 'y') y = true;
    if (textArray[i] === 'n') n = true;
    if (/^[a-z]{5}[0-9]{2}$/.test(textArray[i])) {
      event_id = textArray[i];
      _idPresent = true;
    }
  }

  if ((y) && (_idPresent) && (n)) {
    msg = 'please only choose "y" OR "n" and your confirmation number';
  } else if (n) {
    msg = 'that is too bad. maybe next time.';
  } else if ((y) && (_idPresent)) {
    confirmInvite(res, event_id, phoneNum);
    return;
  }
  if (!msg) {
    msg = 'something did not work. please try again. please choose "y" or "n" and copy in your confirmation number above';
  }
  sendMessage(phoneNum, msg);
}