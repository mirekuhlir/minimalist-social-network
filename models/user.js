const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    select: false
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    select: false
  }
});

// users is collection - list of user items (document)
const User = mongoose.model('users', UserSchema);
module.exports = User;
