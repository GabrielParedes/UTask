'use strict'

const mongoose= require('mongoose');
const Schema = mongoose.Schema;

var CalendarySchema = Schema({
  CalendaryTitle :String,
  CalendaryDescription: String,
  CalendaryStartTime: Date,
  CalendaryEndTime: Date,
  CalendaryStartDate: Date,
  CalendaryEndDate: Date,
  UserId: {type: Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Calendary', CalendarySchema);
