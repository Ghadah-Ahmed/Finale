const express = require("express");
const mongoose = require('mongoose');
const SectionSchema = require("../schema/SectionSchema");
const auth = require("../middleware/auth");


let router = express.Router();
const Section = mongoose.model('Section', SectionSchema);

router.get("/", async (req, res) => {
  res.send( await Section.find({}));
});

router.get("/:id", async (req, res) => {
    res.send( await Section.findById(req.params.id));
});

router.delete("/:id", auth, async (req, res) => {
    res.send( await Section.findByIdAndDelete(req.params.id))
});

router.put("/:id", auth, async (req, res) => {
    res.send(await Section.findByIdAndUpdate(req.params.id,{...req.body}))
});

router.post("/", auth, async (req, res) => {
    res.send( await Section.create(req.body))
});

module.exports = router;