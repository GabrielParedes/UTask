'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GroupSchema = Schema({
  GroupName: String,
  GroupLogo: String,
  UserId: {type: Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Group', GroupSchema);
