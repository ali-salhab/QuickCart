import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Object,
      default: {},
    },
  },
  { minimize: false },
);

// without minimize: false, the cartItems object will be removed if it's empty. By setting minimize to false, we ensure that the cartItems object is always present in the document, even if it's empty. This is important for maintaining the structure of the user document and avoiding potential issues when accessing or updating the cartItems field.

const User = mongoose.models.User || mongoose.model("User", userSchema);
//
export default User;
