'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NoteSchema = Schema({
  NoteTitle: String,
  NoteDescription: String,
  UserId: Number
})

module.exports = mongoose.model('Note', NoteSchema);
