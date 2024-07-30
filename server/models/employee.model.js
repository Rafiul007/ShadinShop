const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role:{
      enum:["admin","employee"],
      default:"employee"
  },
},
  { timestamps: true }
);
module.exports = mongoose.model("Employee", employeeSchema);
