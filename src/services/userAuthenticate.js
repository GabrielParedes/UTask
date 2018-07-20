'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret_key = 'UTask_Key';

exports.createToken = function(loginData){
    var payload = {
        sub: loginData._id,
        UserName: loginData.UserName,
        UserLastName: loginData.UserLastName,
        UserEmail: loginData.UserEmail,
        UserPassword: loginData.UserPassword,
        UserNickname: loginData.UserNickname,
        UserImage: loginData.UserImage,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload ,secret_key);
}
