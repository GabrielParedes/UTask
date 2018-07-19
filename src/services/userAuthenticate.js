'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret_key = 'UTask_Key';

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    UserName: user.UserName,
    UserLastName: user.UserLastName,
    UserEmail: user.UserEmail,
    UserPassword: user.UserPassword,
    UserNickname: user.UserNickname,
    UserImage: user.UserImage,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  };

  return jwt.encode(payload, secret_key);
}
