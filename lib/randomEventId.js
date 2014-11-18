'use strict';

module.exports = function() {
  var wordArray =
 ['pople', 'carom', 'ergot', 'zibeb', 'aglet',
  'cubeb', 'nerpa', 'taler', 'qitra', 'swain',
  'hyrax', 'kvass', 'karst', 'strop', 'skirr',
  'mucid', 'knobs', 'vapid', 'vista', 'karst'];
  var randomNum1 = Math.floor(Math.random()*19);
  var randomNum2 = Math.floor(Math.random()*99);
  return (wordArray[randomNum1] + randomNum2);
};


