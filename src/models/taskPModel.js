'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TaskPSchema = Schema({
  TaskDescription: String,
  TaskStatus: String,
  TaskPriority: Number,
  UserId: Number
})

module.exports = mongoose.model('TasksP', TaskPSchema);
