'use strict';

var validateResponse = require('../lib/validateResponse');

module.exports = function(app) {
//update confirmed field for a specific invitee
  app.post('/api/event/confirm', function(req, res) {
    var phoneNum = req.body.From;//'+15555555555'
    var textString = req.body.Body;//text response
    validateResponse(res, phoneNum, textString);
    res.json({msg: 'sms sent'});
  });
};
