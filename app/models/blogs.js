// step 11 :
const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  auther: { type: mongoose.Types.ObjectId, require: true },
  title: { type: String, require: true },
  text: { type: String, require: true },
  image: { type: String, require: true },
  tags: { type: [String], default: [] },
  comments: { type: [], default: [] },
  category: { type: mongoose.Types.ObjectId, require: true },
  like: { type: mongoose.Types.ObjectId, default: [] },
  deslike: { type: mongoose.Types.ObjectId, default: [] },
  bookmark: { type: mongoose.Types.ObjectId, default: [] },
});

//model name must be capital name
module.exports = {
  BlogModel: mongoose.model("blog", Schema),
};
