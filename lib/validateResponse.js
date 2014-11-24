'use strict';

var confirmInvite = require('../lib/confirmInvite');
var sendMessage = require('../lib/sendMessage');
//makes sure response has the info we need
module.exports = function(res, phoneNum, textString) {
  var textArray = textString.toLowerCase().split(' ');//makes array of words
  var y = false;//flags for presence of required                                      //from text response
  var n = false;//elements in return message
  var _idPresent = false;
  var event_id;
  var msg;
  var confirm;
  for (var i = 0; i < textArray.length; i++) {//iterates through each word
    if (textArray[i] === 'y') y = true;
    if (textArray[i] === 'n') n = true;
    if (/^[a-z]{5}[0-9]{2}$/.test(textArray[i])) {//find if matches randomEventId format
      event_id = textArray[i];
      _idPresent = true;
    }
  }
  //determine which message to send
  if ((y) && (_idPresent) && (n)) {
    msg = 'please only choose "y" OR "n" and your confirmation number';
  } else if (y && _idPresent) {
    confirm = 'y';
    confirmInvite(res, event_id, phoneNum, confirm);//confirms user was invited
    msg = 'you are awesome, see you there';
    return;
  } else if (n && _idPresent) {
    confirm = 'n';
    confirmInvite(res, event_id, phoneNum, confirm);//confirms user was invited
    msg = 'that is too bad. maybe next time.';
    return;
  }
  if (!msg) {//if y and id or n and id are not present
    msg = 'something did not work. please try again. please choose "y" or "n" and copy in your confirmation number above';
  }
  sendMessage(res, phoneNum, msg);
}
