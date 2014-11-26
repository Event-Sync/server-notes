'use strict';

var User = require('../models/user');

module.exports = function(userInfo) {
    var newUser = new User(userInfo);
    newUser.name = userInfo.name;
    newUser.phone_number = userInfo.phone_number;
    newUser.password = newUser.generateHash(userInfo.password);
    return newUser;
};
