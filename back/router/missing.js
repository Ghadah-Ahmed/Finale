const express = require("express");
const mongoose = require('mongoose');
const MissingSchema = require("../schema/MissingSchema");


let router = express.Router();
const Missing = mongoose.model('Missing', MissingSchema);

router.get("/", async (req, res) => {
  res.send((await Missing.find({})));
});

router.delete("/:menuID", async(req, res) => {
    res.send(await Missing.findOneAndDelete({menu: req.params.menuID})); 
}); 

router.post("/", async (req, res) => {
    res.send( await Missing.create(req.body))
});

module.exports = router;
