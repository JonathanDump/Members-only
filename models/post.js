const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema(
  {
    title: { type: String, maxLength: 100 },
    text: { type: String, required: true, minLength: 1, maxLength: 300 },
    date: { type: Date, required: true, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { collection: "posts" }
);

PostSchema.virtual("url").get(function () {
  return `${this.name} ${this.lastName}`;
});

PostSchema.virtual("formattedDate").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});
module.exports = mongoose.model("Post", PostSchema);
