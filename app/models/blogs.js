// step 11 :
// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
  user : { type : mongoose.Types.ObjectId , ref : "users" , require : true},
  comment : {type : String , required : true},
  createAt : {type : Date , default : new Date().now()},
  parent : {type : mongoose.Types.ObjectId },
})
 
const Schema = new mongoose.Schema({
  auther: { type: mongoose.Types.ObjectId, require: true },
  title: { type: String, require: true },
  short_text: { type: String, require: true },
  text: { type: String, require: true },
  image: { type: String, require: true },
  tags: { type: [String], default: [] },
  comments: { type: [CommentSchema], default: [] },
  category: { type: [mongoose.Types.ObjectId], require: true },
  like: { type: [mongoose.Types.ObjectId],ref : "users", default: [] },
  deslike: { type: [mongoose.Types.ObjectId],ref : "users", default: [] },
  bookmark: { type: [mongoose.Types.ObjectId],ref : "users", default: [] },
},{timestamps : true , versionKey : false}); // timestamps true bashe createAt , updateAt ro moshakhass mikone  va versionKey false iani zakhire nakone versionesh ro 

//model name must be capital name
module.exports = {
  BlogModel: mongoose.model("blog", Schema),
};
