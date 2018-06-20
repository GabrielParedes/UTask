'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_IN6BM';

exports.createToken = function(userModel){
    var payload = {
        sub: user._id,
        UserName: userModel.UserName,
        UserLastName: userModel.UserLastName,
        UserEmail: userModel.UserEmail,
        UserPassword: userModel.UserPassword,
        UserNickname: userModel.UserNickname,
        UserImage: userModel.UserImage,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload ,secret);
}
