// step 11 :
// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
const { CommentSchema } = require("./public.schema");

// in mavared 3 dasete mishan :
// daste 1 : mavaredi k require hast va front end baiad befreste
// daste 2 : mavaredi k require hast vali backend baiad bede mesle author k bebine login karde id user ro az req bardare va bde b author
// daste 3 : onaie k default dare iani mitone front ya swager to parameters bgire va befrestateshon vagarna hamin meghdare defaultesh ersal mishe

const BlogSchema = new mongoose.Schema(
  {
    auther: { type: mongoose.Types.ObjectId, ref: "user", require: true },
    title: { type: String, require: true },
    short_text: { type: String, require: true },
    text: { type: String, require: true },
    image: { type: String, require: true },
    tags: { type: [String], default: [] },
    comments: { type: [CommentSchema], default: [] },
    category: { type: mongoose.Types.ObjectId, require: true }, // ref: "category", required :true
    likes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
); // timestamps true bashe createAt , updateAt ro moshakhass mikone  va versionKey false iani zakhire nakone versionesh ro
BlogSchema.virtual("user", {
  ref: "user",
  localField: "_id",
  foreignField: "author",
});
BlogSchema.virtual("category_detail", {
  // name foreignField nabaiad ba name virtual yeki bashe pas ino mizarim category_detail
  ref: "category",
  localField: "_id",
  foreignField: "category",
});

// step 228 :روی هر اسکیمایی خواستین ویرچوال بزنید باید در جی سلانش ویرچوال رو فعال کنید.
// ye imageURL dar har course bzar va boro to .env va in 2 ta motaghaiere ro ezafe mikonim b ebtedaie image k dar har course hast
//vase  liara1 taghieresh bede
BlogSchema.virtual("imageURL").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`; // this eshare b hamin blogschema dare
});
//model name must be capital name

module.exports = {
  BlogModel: mongoose.model("blog", BlogSchema),
};
