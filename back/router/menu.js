const express = require("express");
const mongoose = require('mongoose');
const MenuSchema = require("../schema/MenuSchema");


let router = express.Router();
const Menu = mongoose.model('Menu', MenuSchema);

router.get("/", async (req, res) => {
  res.send((await Menu.find({})));
});
router.get("/:id", async (req, res) => {
  res.send((await Menu.findById(req.params.id)));
});

router.delete("/:id", async (req, res) => {
  res.send( await Menu.findByIdAndDelete(req.params.id))
});

router.patch("/:id", async (req, res) => {
  res.send( await  Menu.findByIdAndUpdate(req.params.id,{...req.body})) 
});

router.post("/", async (req, res) => {
    res.send( await Menu.create(req.body))
});

module.exports = router;
