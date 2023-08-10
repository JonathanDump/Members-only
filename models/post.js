const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 100 },
    text: { type: String, required: true, minLength: 1, maxLength: 100 },
    date: { type: Date, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "posts" }
);

PostSchema.virtual("url").get(function () {
  return `${this.name} ${this.lastName}`;
});

module.exports = mongoose.model("Post", PostSchema);
