import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: String,

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
