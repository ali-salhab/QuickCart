import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  { minimize: false },
);

// this for not reacreate the model if it already exists in the database, this is useful for hot reloading in development mode
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
