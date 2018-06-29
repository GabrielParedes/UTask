'use strict'

const mongoose= require('mongoose');
const Schema = mongoose.Schema;

var NoteSchema = Schema({
  CalendaryTitle :String,
  CalendaryDescription: String,
  CalendaryStartTime: Date,
  CalendaryEndTime: Date,
  CalendaryStartDate: Date,
  CalendaryEndTime: Date,
  UserId {type: Schema.ObjectId, ref: 'Users'}
})

module.exports = mongoose.model('Calendary', CalendarySchema);
