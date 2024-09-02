const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const guestSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guest: { type: Boolean, default: true },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("GuestCustomer", guestSchema);
