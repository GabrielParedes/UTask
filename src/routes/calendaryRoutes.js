'use strict'

var express = require('express');
var calendaryController = require('../controllers/calendaryController');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.get('/calendary/list',md_auth.ensureAuth, calendaryController.createCalendary);
api.post('/calendary/create',md_auth.ensureAuth, calendaryController.readCalendary);
api.put('/calendary/update/id',md_auth.ensureAuth, calendaryController.updateCalendary);
api.delete('/calendary/delete/id',md_auth.ensureAuth, calendaryController.deleteCalendary);
module.exports = api;
