// step 123 : az to blog model avordim invar k hame ja betone use konim
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user", require: true },
  comment: { type: String, required: true },
  createAt: { type: Date, default: new Date().getTime() },
  parent: { type: mongoose.Types.ObjectId , ref : "comment" },
});

module.exports = {
  CommentSchema
};