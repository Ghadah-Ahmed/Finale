const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'User name should be provided']
    },
    city: {
      type: String,
      required: [true, 'City should be provided']
    },
    district: {
      type: String,
      required: [true, 'District should be provided']
    },
    email: {
      type: String,
      required: [true, 'Email should be provided']
    },
    password: {
      type: String,
      required: [true, 'Password should be provided']
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Admin id should be provided'],
      ref: "Admin"
    }
});