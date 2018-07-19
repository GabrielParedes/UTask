'use strict'

var express = require('express');
var userController = require('../controllers/userController');
var md_auth = require('../middlewares/authenticated');

//Upluad Image
var multipart = require('connect-multiparty');
var md_upload =  multipart({uploadDir: './src/uploads/users'});

var api = express.Router();
api.get('/user/list', userController.userList);
api.get('/user/getImage/:imageFile', userController.getImageFile);
api.post('/user/register', userController.userRegister);
api.post('/user/login', userController.userLogin);
api.post('/user/updateImage/:id', [md_auth.ensureAuth, md_upload] ,userController.uploadImage);
api.put('/user/update/:id' ,userController.updateUser);
api.delete('/user/delete/:id', userController.deleteUser);
module.exports = api;
