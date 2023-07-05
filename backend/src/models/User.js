const mongoose = require('mongoose')

const userSchemea = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  roles: {
    type: String,
    default: 'Client'
  },
  active: {
    type: Boolean,
    default: true
  },
  image_link: {
    type: String,
    required: false,
    default: ''
  },
  about: {
    type: String,
    required: false,
    default: ''
  }
})
module.exports = mongoose.model('User', userSchemea)
