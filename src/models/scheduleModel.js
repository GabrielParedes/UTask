'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ScheduleSchema = Schema({
  SchemaDay: String,
  SchemaDescription: String,
  SchemaStart: Date,
  SchemaEnd: Date,
  UserId: Number
})

module.exports = mongoose.model('Schedules', ScheduleSchema);
