const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price:{
        type: Number,
        required: true
    }
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("OrderItem", orderItemSchema);
