// step 12 :
const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, require: true },
});

//model name must be capital name
module.exports = {
  CategoryModel: mongoose.model("category", Schema),
};
