const mongoose = require('mongoose');

module.exports =  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Dish name should be provided']
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Admin id should be provided'],
      ref: "Admin"
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Section id should be provided'],
      ref: "Section"
    }
});