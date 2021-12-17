const express = require("express");
const mongoose = require('mongoose');
const SectionSchema = require("../schema/SectionSchema");


let router = express.Router();
const Section = mongoose.model('Section', SectionSchema);

router.get("/", async (req, res) => {
  res.send( await Section.find({}));
});

router.get("/:id", async (req, res) => {
    res.send( await Section.findById(req.params.id));
});

router.delete("/:id", async (req, res) => {
    res.send( await Section.findByIdAndDelete(req.params.id))
});

router.put("/:id", async (req, res) => {
    res.send(await Section.findByIdAndUpdate(req.params.id,{...req.body}))
});

router.post("/", async (req, res) => {
    res.send( await Section.create(req.body))
});

module.exports = router;