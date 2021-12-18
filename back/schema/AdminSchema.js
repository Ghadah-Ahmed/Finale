const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'admin name should be provided']
    },
    email: {
      type: String,
      required: [true, 'Email should be provided']
    },
    password: {
      type: String,
      required: [true, 'Password should be provided']
    }
});