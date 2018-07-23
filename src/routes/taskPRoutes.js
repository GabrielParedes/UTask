'use strict'

var express = require('express');
var taskPController = require('../controllers/taskPController');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.get('/taskP/list', md_auth.ensureAuth, taskPController.readTaskP);
api.post('/taskP/create', md_auth.ensureAuth, taskPController.createTaskP);
api.put('/taskP/update/:id', md_auth.ensureAuth, taskPController.updateTaskP);
api.delete('/taskP/delete/:id', md_auth.ensureAuth, taskPController.deleteTaskP);
module.exports = api;
