const mongoose = require('mongoose');

module.exports =  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Section name should be provided']
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'admin id should be provided'],
      ref: "Admin"
    }
});