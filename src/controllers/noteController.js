'use strict'
const express = require('express');
var bcrypt = require('bcrypt-nodejs');
var Note = require('../models/noteModel');
var jwt = require('../services/userAuthenticate');
var path = require('path');
var fs = require('fs');

function noteRegister(req, res){
    var note = new Note();

    if(req.params.id){
        note.NoteTitle = req.body.NoteTitle;
        note.NoteDescription = req.body.NoteDescription;
        note.UserId = req.user.sub;

        user.save((err, userStored)=>{
          if(err) return res.status(500).send({message: 'Error al guardar la nota'});
            if(userStored){
              res.status(200).send({user: userStored})
            }else{
              res.status(404).send({message: 'No se ha registrado la nota'});
            }
          });
        });
    }else{
        res.status(200).send({
            message: 'Rellene todos los datos necesarios'
        });
    }

}

 function updateNote(req, res){
    var userId = req.params.id;

    if(userId != req.user.sub){
       return res.status(500).send({message: 'No tienes permiso para actualizar los datos de la nota'});
    }else{
      User.find({ $or: [
         {UserEmail: req.body.UserEmail.toLowerCase()},
         {UserNickname: req.body.UserNickname.toLowerCase()}
     ]}).exec((err, users)=>{
         var user_isset = false;

         User.findByIdAndUpdate(userId, update, {new:true} ,(err, userUpdated) => {
             if(err) return res.status(500).send({message: 'Error en la peticion'});

             if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

             return res.status(200).send({user: userUpdated});
          });
     })
    }
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
