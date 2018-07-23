'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ScheduleSchema = Schema({
  SchemaDay: String,
  SchemaDescription: String,
  SchemaStart: Date,
  SchemaEnd: Date,
  UserId: {type: Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Schedule', ScheduleSchema);
