import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
