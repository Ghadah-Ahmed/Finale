const express = require("express");
const mongoose = require('mongoose');
const UserSchema = require("../schema/UserSchema");

let router = express.Router();
const User = mongoose.model('User', UserSchema);


router.get("/:adminID", async(req, res) => {
  res.send(await User.find({admin: req.params.adminID})); 
});

router.get("/:id", async (req, res) => {
  res.send((await User.findById(req.params.id)));
});

router.delete("/:id", async (req, res) => {
  res.send( await User.findByIdAndDelete(req.params.id))
});

router.patch("/:id", async (req, res) => {
  res.send(await User.findByIdAndUpdate(req.params.id,{...req.body}))
});

router.post("/", async (req, res) => {
  res.send( await User.create(req.body))
});

module.exports = router;
