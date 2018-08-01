'use strict'
var express = require('express');
var contactController = require('../controllers/contactController');

var api = express.Router();
api.post('/contact/send', contactController.sendContact);

module.exports = api;
