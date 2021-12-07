const express = require("express");
const mongoose = require('mongoose');
const MenuSchema = require("../schema/MenuSchema");
const MissingSchema = require("../schema/MissingSchema");


let router = express.Router();
const Menu = mongoose.model('Menu', MenuSchema);
const Missing = mongoose.model('Missing', MissingSchema);

// Get Final Menu
router.get("/:adminID/:userID", async(req, res) => {
  Missing.find({user: req.params.userID}, (err, missing) => {
    var a = missing.map((b)=> {return b.menu})
    Menu.find({admin: req.params.adminID, _id: {$nin: a}}, (err, available) => {
      Menu.find({admin: req.params.adminID, _id: {$in: a}}, (err, notAvailable) => {
       var here = available.map((a)=> {return {...a._doc, available: true}})
       var notHere = notAvailable.map((a)=> {return {...a._doc, available: false}})
        res.send(here.concat(notHere))
      })
    })
  })
});


router.get("/:adminID", async(req, res) => {
    res.send(await Menu.find({admin: req.params.adminID}).populate("admin")); 
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
