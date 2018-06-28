'use strict'
const express = require('express');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/userModel');
var jwt = require('../services/userAuthenticate');
var path = require('path');
var fs = require('fs');
function home(req, res) {
    res.status(200).send({
        message: 'Hola'
    });
}

function registrar(req, res){
    var user = new User();
    console.log(req.body.UserName);
    console.log(req.body.UserNickname);
    console.log(req.body.UserPassword);
    if(req.body.UserName && req.body.UserNickname && req.body.UserPassword && req.body.UserEmail){
        user.UserName = req.body.UserName;
        user.UserLastName = req.body.UserLastName;
        user.UserEmail = req.body.UserEmail;
        user.UserPassword = req.body.UserPassword;
        user.UserNickname = req.body.UserNickname;
        user.UserImage = null;


        User.find({ $or: [
            {email: user.UserEmail.toLowerCase()},
            {nick: user.UserNickname.toLowerCase()}
        ]}).exec((err, users) =>{
            if(err) return res.status(500).send({message: 'Error en la peticion de usuarios'});

            if(users && users.length >= 1){
                return res.status(500).send({message: 'El usuario ya existe'});
            }else{
                bcrypt.hash(req.body.UserPassword, null,null, (err, hash)=>{
                    user.UserPassword = hash;

                    user.save((err, userStored)=>{
                        if(err) return res.status(500).send({message: 'Error al guardar el usario'});

                        if(userStored){
                            res.status(200).send({user: userStored})
                        }else{
                            res.status(404).send({message: 'no se ha registrado el usuario'});
                        }
                    });
                });
            }
        });
    }else{
        res.status(200).send({
            message: 'Rellene todos los datos necesarios'
        });
    }

}

function login(req, res){
    var params = req.body;
    var email = params.UserEmail;
    var password = params.UserPassword;

    User.findOne({UserEmail: email}, (err, user)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(user){
            bcrypt.compare(password, user.UserPassword, (err, check)=>{
                if(check){
                  console.log(check);
                    //if(req.body.gettoken){
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    //}else{

                        /*user.UserPassword = undefined;
                        return res.status(200).send({user});*/
                    //}
                }else{
                    return res.status(404).send({message: 'Wrong password'});
                }
            });
        }else{
            return res.status(404).send({message: 'Wrong email'});
        }
    });
}

function uploadImage(req, res){
    var userId = req.params.id;

    if(userId != req.user.sub){

    }

    if(req.files){
        var file_path = req.files.image.path;
        console.log(file_path);

        var file_split  = file_path.split('\\');
        console.log(file_split);

        var file_name = file_split[3];
        console.log(file_name);

        var ext_xplit = file_name.split('\.');
        console.log(ext_xplit);

        var file_ext = ext_xplit[1];
        console.log(file_ext);

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
            User.findByIdAndUpdate(userId, {image: file_name}, {new:true}, (err, userUpdated)=>{
                if(err) return res.status(500).send({message: 'Error en la peticion'});

                if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usario'});

                return res.status(200).send({user: userUpdated});
            });
        }else{
            return removeFilerOfUploads(res, file_path, 'Extension no valida');
        }



    }else{
        return res.status(200).send({message: 'no se han subido imagenes'});
    }

}

function removeFilerOfUploads(res, file_path, message){
    fs.unlink(file_path, (err)=>{
        return res.status(200).send({message: message});
    });
}
 function getImageFile(req, res){
     var image_file = req.params.imageFile;
     var path_file = './src/uploads/users/' + image_file;

     fs.exists(path_file, (exists) => {
         if(exists){
             res.sendFile(path.resolve(path_file));
         }else{
             res.status(200).send({message: 'No existe la imagen'});
         }
     });
 }

 function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    //BORRAR LA PROPIEDAD PASSWORD
    delete update.password;

    if(userId != req.user.sub){
       return res.status(500).send({message: 'No tienes permiso para actualizar los datos del usuario'});
    }

    User.find({ $or: [
       {email: update.email.toLowerCase()},
       {nick: update.nick.toLowerCase()}
   ]}).exec((err, users)=>{
       var user_isset = false;
       users.forEach((user) =>{
           if(user && user._id != userId) user_isset = true;
       });

       if(user_isset) return res.status(404).send({message: 'Los datos ya estan en uso'});

       User.findByIdAndUpdate(userId, update, {new:true} ,(err, userUpdated) => {
           if(err) return res.status(500).send({message: 'Error en la peticion'});

           if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

           return res.status(200).send({user: userUpdated});
        });
   })
 }

module.exports = {
    registrar,
    login,
    home,
    uploadImage,
    getImageFile,
    updateUser
}
