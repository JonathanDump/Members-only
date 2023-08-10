const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 1, maxLength: 100 },
    lastName: { type: String, required: true, minLength: 1, maxLength: 100 },
    email: { type: String, required: true, minLength: 1, maxLength: 100 },
    password: { type: String, required: true, minLength: 1, maxLength: 100 },
    isMember: { type: Boolean },
    isAdmin: { type: Boolean },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { collection: "users" }
);

UserSchema.virtual("url").get(function () {
  return `${this.name} ${this.lastName}`;
});

module.exports = mongoose.model("User", UserSchema);
