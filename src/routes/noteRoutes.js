'use strict'

var express = require('express');
var noteController = require('../controllers/noteController');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.get('/note/list', md_auth.ensureAuth, noteController.readNote);
api.post('/note/create', md_auth.ensureAuth, noteController.createNote);
api.put('/note/update/:id', md_auth.ensureAuth, noteController.updateNote);
api.delete('/note/delete/:id', md_auth.ensureAuth, noteController.deleteNote);
module.exports = api;
