'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = Schema({
  UserName: String,
  UserLastName: String,
  UserEmail: String,
  UserPassword: String,
  UserNickname: String,
  UserImage: String
})

module.exports = mongoose.model('Users', UserSchema);
