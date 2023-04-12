// step 11 :
// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
  user : { type : mongoose.Types.ObjectId , ref : "user" , require : true},
  comment : {type : String , required : true},
  createAt : {type : Date , default : new Date().getTime()},
  parent : {type : mongoose.Types.ObjectId },
})
 
// in mavared 3 dasete mishan :
// daste 1 : mavaredi k require hast va front end baiad befreste
// daste 2 : mavaredi k require hast vali backend baiad bede mesle author k bebine login karde id user ro az req bardare va bde b author
// daste 3 : onaie k default dare iani mitone front ya swager to parameters bgire va befrestateshon vagarna hamin meghdare defaultesh ersal mishe

const Schema = new mongoose.Schema({
  auther: { type: mongoose.Types.ObjectId, require: true },
  title: { type: String, require: true },
  short_text: { type: String, require: true },
  text: { type: String, require: true },
  image: { type: String, require: true },
  tags: { type: [String], default: [] },
  comments: { type: [CommentSchema], default: [] },
  category: { type: mongoose.Types.ObjectId, require: true }, // ref: "category", required :true
  likes: { type: [mongoose.Types.ObjectId],ref : "user", default: [] },
  dislikes: { type: [mongoose.Types.ObjectId],ref : "user", default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId],ref : "user", default: [] },
},{timestamps : true , versionKey : false}); // timestamps true bashe createAt , updateAt ro moshakhass mikone  va versionKey false iani zakhire nakone versionesh ro 




//model name must be capital name

module.exports = {
  BlogModel: mongoose.model("blog", Schema),
};
