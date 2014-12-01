'use strict';

//creates a random eventID that is
// user readable ex.'taler43'
module.exports = function() {
  var wordArray =
 ['pople', 'carom', 'ergot', 'zibeb', 'aglet',
  'cubeb', 'nerpa', 'taler', 'qitra', 'swain',
  'hyrax', 'kvass', 'karst', 'strop', 'skirr',
  'mucid', 'knobs', 'vapid', 'vista', 'karst'];
  var randomNum1 = Math.floor(Math.random()*19);
  var randomNum2 = Math.floor(Math.random()*89+10);
  return (wordArray[randomNum1] + randomNum2);
};


