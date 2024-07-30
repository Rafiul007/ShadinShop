const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchema = new Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Address", addressSchema);
