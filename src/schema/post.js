import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      minLength: 5,
    },
    image: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
  },
  { timestamps: true }
);

const post = mongoose.model("Post", postSchema); // post collection

export default post;
