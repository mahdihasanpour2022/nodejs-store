// step 14 :
const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String },
  text: { type: String },
  image: { type: String, requires: true },
  type : {type : String , default : "main"}
});

//model name must be capital name
module.exports = {
  SliderModel: mongoose.model("slider", Schema),
};
