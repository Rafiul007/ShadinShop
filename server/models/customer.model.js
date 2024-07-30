const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address:{
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true
  }
},
  { timestamps: true }
);
module.exports = mongoose.model("Customer", customerSchema);
