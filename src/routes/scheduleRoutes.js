'use strict'

var express = require('express');
var scheduleController = require('../controllers/scheduleController');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.get('/schedule/list', md_auth.ensureAuth, scheduleController.readSchedule);
api.post('/schedule/create', md_auth.ensureAuth, scheduleController.createSchedule);
api.put('/schedule/update/:id', md_auth.ensureAuth, scheduleController.updateSchedule);
api.delete('/schedule/delete/:id', md_auth.ensureAuth, scheduleController.deleteSchedule);
module.exports = api;
