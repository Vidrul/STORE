const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
    image: { type: String },
    price: { type: Number },
    amount: { type: Number },
  },
  { timestamps: true }
);

module.exports = model("Goods", schema);
