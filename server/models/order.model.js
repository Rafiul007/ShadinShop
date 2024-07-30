const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    orderItems: [{
      type: Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    }],
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
