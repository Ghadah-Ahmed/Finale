const express = require("express");
const mongoose = require('mongoose');
const UserSchema = require("../schema/UserSchema");

let router = express.Router();
const User = mongoose.model('User', UserSchema);


router.get("/", async (req, res) => {
  res.send(await User.find({})); 
});

router.get("/:authorId", async(req, res) => {
  res.send(await User.find({author_id: req.params.authorId})); 
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
