'use strict';

var validateResponse = require('../lib/validateResponse');


module.exports = function(app) {
//update confirmed field for a specific invitee
  app.post('/api/event/confirm', function(req, res){
    var phoneNum = req.body.From;
    var textString = req.body.Body;
    validateResponse(res, phoneNum, textString);
    res.json({msg: 'sms sent'});
  });
};
