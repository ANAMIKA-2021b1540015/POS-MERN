const express = require("express");
const billModel = require("../models/billModel");
const { model } = require("mongoose");
const router = express.Router();

router.post("/add-bill", async (req, res) => {
  try {
    const newbill = new billModel(req.body);
    await newbill.save();
    res.send("Bill charged successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/get-bills", async (req, res) => {
  try {
    const bills = await billModel.find();
    res.send(bills);
  } catch (error) {
    res.status(400).json(error);
  }
});

model.exports = router;

module.exports = router;
