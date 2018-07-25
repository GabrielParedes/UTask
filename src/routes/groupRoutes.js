'use strict'

var express = require('express');
var groupController = require('../controllers/groupController');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.get('/group/list',md_auth.ensureAuth, groupController.createGroup);
api.post('/group/create',md_auth.ensureAuth, groupController.readGroup);
api.put('/group/update/:id',md_auth.ensureAuth, groupController.updateGroup);
api.delete('/group/delete/:id',md_auth.ensureAuth, groupController.deleteGroup);
module.exports = api;
