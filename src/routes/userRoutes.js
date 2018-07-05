'use strict'

var express = require('express');
var userController = require('../controllers/userController');
var md_auth = require('../middlewares/authenticated');

//Upluad Image
var multipart = require('connect-multiparty');
var md_upload =  multipart({uploadDir: './src/uploads/users'});

var api = express.Router();
api.get('/get-image-user/:imageFile', userController.getImageFile);
api.post('/register', userController.userRegister);
api.post('/login', userController.userLogin);
api.post('/update-image-user/:id', [md_auth.ensureAuth, md_upload] ,userController.uploadImage);
api.put('/update-user/:id', md_auth.ensureAuth ,userController.updateUser);
api.delete('/deleteUser/:id', userController.deleteUser);
module.exports = api;
