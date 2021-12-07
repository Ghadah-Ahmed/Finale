const express = require("express");
const mongoose = require('mongoose');
const AdminSchema = require("../schema/AdminSchema");


let router = express.Router();
const Admin = mongoose.model('Admin', AdminSchema);

router.get("/", async (req, res) => {
  res.send((await Admin.find({})));
});

router.get("/:id", async (req, res) => {
  res.send( await Admin.findById(req.params.id));
});

router.delete("/:id", async (req, res) => {
  res.send( await Admin.findByIdAndDelete(req.params.id))
});

router.patch("/:id", async (req, res) => {
  res.send( await  Admin.findByIdAndUpdate(req.params.id,{...req.body})) 
});

router.post("/", async (req, res) => {
    res.send( await Admin.create(req.body))
});

module.exports = router;