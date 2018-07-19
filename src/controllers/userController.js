'use strict'
const express = require('express');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/userModel');
var jwt = require('../services/userAuthenticate');
var path = require('path');
var fs = require('fs');

function listUser(req, res) {
  User.find((error, users) => {
    if (error) return res.status(500).send(err)
    return res.status(200).send(users);
  })
}

/*Kitten.findById(req.params.kittenId, (err, kitten) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(kitten)
});*/

function registerUser(req, res) {
  var user = new User();

  if (req.body.UserName && req.body.UserNickname && req.body.UserPassword && req.body.UserEmail) {
    user.UserName = req.body.UserName;
    user.UserLastName = req.body.UserLastName;
    user.UserEmail = req.body.UserEmail;
    user.UserPassword = req.body.UserPassword;
    user.UserNickname = req.body.UserNickname;
    user.UserImage = null;


    User.find({
      $or: [{
          UserEmail: user.UserEmail.toLowerCase()
        },
        {
          UserNickname: user.UserNickname.toLowerCase()
        }
      ]
    }).exec((err, users) => {
      if (err) return res.status(500).send({
        message: 'Request Error'
      });

      if (users && users.length >= 1) {
        return res.status(500).send({
          message: 'User already exists'
        });
      } else {
        bcrypt.hash(req.body.UserPassword, null, null, (err, hash) => {
          user.UserPassword = hash;

          user.save((err, userStored) => {
            if (err) return res.status(500).send({
              message: 'User register Wrong'
            });

            if (userStored) {
              res.status(200).send({
                user: userStored
              })
            } else {
              res.status(404).send({
                message: 'Not registered'
              });
            }
          });
        });
      }
    });
  } else {
    res.status(200).send({
      message: 'Fill all fields'
    });
  }

}

function loginUser(req, res) {
  var params = req.body;
  var email = params.email;
  var password = params.password;

  User.findOne({
    UserEmail: email /*req.body.UserEmail*/
  }, (err, user) => {
    if (err) return res.status(500).send({
      message: 'Request Wrong'
    });

    if (user) {
      bcrypt.compare(password, user.UserPassword, (err, check) => {
        if (check) {
          if (req.body.gettoken) {
            return res.status(200).send({
              token: jwt.createToken(user)
            });
          } else {
            user.UserPassword = undefined;
            return res.status(200).send({
              user
            });
          }
        } else {
          return res.status(404).send({
            message: 'El usuario no se ha podido identificar'
          });
        }
      });
    } else {
      return res.status(404).send({
        message: 'El usuario no se ha podido logear'
      });
    }
  });
}

function uploadImage(req, res) {
  var userId = req.params.id;

  if (userId != req.user.sub) {

  }

  if (req.files) {
    var file_path = req.files.image.path;
    console.log(file_path);

    var file_split = file_path.split('\\');
    console.log(file_split);

    var file_name = file_split[3];
    console.log(file_name);

    var ext_xplit = file_name.split('\.');
    console.log(ext_xplit);

    var file_ext = ext_xplit[1];
    console.log(file_ext);

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
      User.findByIdAndUpdate(userId, {
        image: file_name
      }, {
        new: true
      }, (err, userUpdated) => {
        if (err) return res.status(500).send({
          message: 'Request Wrong'
        });

        if (!userUpdated) return res.status(404).send({
          message: 'Cannot update user'
        });

        return res.status(200).send({
          user: userUpdated
        });
      });
    } else {
      return removeFilerOfUploads(res, file_path, 'Invalid extension');
    }
  } else {
    return res.status(200).send({
      message: 'Upload Wrong'
    });
  }

}

function removeFilerOfUploads(res, file_path, message) {
  fs.unlink(file_path, (err) => {
    return res.status(200).send({
      message: message
    });
  });
}

function getImageFile(req, res) {
  var image_file = req.params.imageFile;
  var path_file = './src/uploads/users/' + image_file;

  fs.exists(path_file, (exists) => {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({
        message: 'Image doesnt exist'
      });
    }
  });
}

function updateUser(req, res) {
  var userId = req.params.id;

  //BORRAR LA PROPIEDAD PASSWORD
  delete req.body.UserPassword;

  User.findByIdAndUpdate(userId, req.body, {
      new: true
    }, (err, userUpdated) => {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!userUpdated) return res.status(404).send({
        message: 'No se ha podido eliminar el usuario'
      });
      return res.send(userUpdated);
    )
  }
}

function deleteUser(req, res) {
  var userId = req.params.id;

  User.findByIdAndRemove(userId, (err, userDeleted) => {
    if (err) return res.status(500).send({
      message: 'Error en la peticion'
    });
    if (!userDeleted) return res.status(404).send({
      message: 'No se ha podido eliminar el usuario'
    });
    return res.status(200).send({
      message: 'Usuario eliminado'
    });
  });
}


module.exports = {
  listUser,
  registerUser,
  loginUser,
  uploadImage,
  getImageFile,
  updateUser,
  deleteUser
}
