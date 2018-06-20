'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret_key  ='UTask_Key';

exports.ensureAuth = function(req, res, next){
if(!req.headers.authorization){
    return res.status(404).send({message: 'Unknown header'});
}

var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        var payload = jwt.decode(token, secret_key);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message : 'Expired token'
            });
        }
    }catch(ex){
        return res.status(404).send({
            message: 'Invalid token'
        });
    }

    req.user = payload;

    next();

}
