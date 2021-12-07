const mongoose = require('mongoose');

module.exports =  new mongoose.Schema({
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'menu id should be provided'],
        ref: "Menu"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'user id should be provided'],
      ref: "User"
    }
});