const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerNumber: { type: String, required: true },
    paymentMode: { type: String, required: true },
    cartItems: { type: Array, required: true },
    tax: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Bills = mongoose.model("bills", billSchema);

module.exports = Bills;
