const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    size: [{
      type: Schema.Types.ObjectId,
      ref: "Size",
      default: null,
    }],
    images: [{ type: String, required: true }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    discount: { type: Schema.Types.ObjectId, ref: "Discount", default: null },
    relatedProducts: [{
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
