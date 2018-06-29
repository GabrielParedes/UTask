'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ContactSchema = Schema({
  UserId: Number,
  UserId2: Number
})

module.exports = mongoose.model('Contact', ContactSchema);
