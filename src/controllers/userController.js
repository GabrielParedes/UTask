'use strict'

var bcrypt = require('bcrypt-nodejs');
var userModel = require('../models/userModel');
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');
function home(req, res) {
    res.status(200).send({
        message: 'Hola'
    });

}

function register(req, res){
    var user = new userModel();
    var params = req.body;

    if(params.UserName && params.UserNickname && params.UserPassword){
      user.UserName: params.UserName,
      user.UserLastName: params.UserLastName,
      user.UserEmail: params.UserEmail,
      user.UserPassword: params.UserPassword,
      user.UserNickname: params.UserNickname,
      user.UserImage: null,

        userModel.find({ $or: [
            {email: user.UserEmail.toLowerCase()},
            {nick: user.UserNickname.toLowerCase()}
        ]}).exec((err, users) =>{
            if(err) return res.status(500).send({message: 'Error en la peticion de usuarios'});

            if(users && users.length >= 1){
                return res.status(500).send({message: 'El usuario ya existe'});
            }else{
                bcrypt.hash(params.UserPassword, null,null, (err, hash)=>{
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

    userModel.findOne({email: email}, (err, user)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(user){
            bcrypt.compare(password, user.UserPassword, (err, check)=>{
                if(check){
                    if(params.gettoken){
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        user.UserPassword = undefined;
                        return res.status(200).send({user});
                    }
                }else{
                    return res.status(404).send({message: 'el usuario no se a podido identificar'});
                }
            });
        }else{
            return res.status(404).send({message: 'el usuario no se a podido logear'});
        }
    });
}

function uploadImage(req, res){
    var userId = req.params.UserId;

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
            userModel.findByIdAndUpdate(UserId, {image: file_name}, {new:true}, (err, userUpdated)=>{
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
    var userId = req.params.UserId;
    var update = req.body;

    //BORRAR LA PROPIEDAD PASSWORD
    delete update.UserPassword;

    if(userId != req.user.sub){
       return res.status(500).send({message: 'No tienes permiso para actualizar los datos del usuario'});
    }

    User.find({ $or: [
       {email: update.UserEmail.toLowerCase()},
       {nick: update.UserNickname.toLowerCase()}
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
    register,
    login,
    home,
    uploadImage,
    getImageFile,
    updateUser
}
