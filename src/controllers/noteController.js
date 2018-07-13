'use strict'
const express = require('express');
var bcrypt = require('bcrypt-nodejs');
var Note = require('../models/noteModel');
var jwt = require('../services/userAuthenticate');
var path = require('path');
var fs = require('fs');

function userRegister(req, res){
    var note = new Note();

    if(req.params.id){
        note.NoteTitle = req.body.NoteTitle;
        note.NoteDescription = req.body.NoteDescription;
        note.UserId = req.user.sub;

        User.find({ $or: [
            {UserEmail: user.UserEmail.toLowerCase()},
            {UserNickname: user.UserNickname.toLowerCase()}
        ]}).exec((err, users) =>{
            if(err) return res.status(500).send({message: 'Request Error'});

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

function userLogin(req, res){

    User.findOne({UserEmail: req.body.UserEmail}, (err, user)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(user){
            bcrypt.compare(req.body.UserPassword, user.UserPassword, (err, check)=>{
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

    //BORRAR LA PROPIEDAD PASSWORD
    delete req.body.UserPassword;

    if(userId != req.user.sub){
       return res.status(500).send({message: 'No tienes permiso para actualizar los datos del usuario'});
    }

    User.find({ $or: [
       {UserEmail: req.body.UserEmail.toLowerCase()},
       {UserNickname: req.body.UserNickname.toLowerCase()}
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

 function deleteUser(req, res){
    var userId = req.params.id;

   User.findByIdAndRemove(userId ,(err, userDeleted) => {
       if(err) return res.status(500).send({message: 'Error en la peticion'});

       if(!userDeleted) return res.status(404).send({message: 'No se ha podido eliminar el usuario'});

       return res.status(200).send({message: 'Usuario eliminado'});
    });
 }


module.exports = {
    userRegister,
    userLogin,
    uploadImage,
    getImageFile,
    updateUser,
    deleteUser
}
