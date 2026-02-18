import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorId: {
      type: String, // viene del token (.NET)
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
