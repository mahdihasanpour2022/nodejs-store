// step 124 :
const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const EpisodesSchema = new mongoose.Schema({
  title: { type: String, require: true },
  text: { type: String, require: true },
  type: { type: String, default: "free" },
  time: { type: String, require: true },
});

const ChapterSchema = new mongoose.Schema({
  title: { type: String, require: true },
  text: { type: String, default: "" },
  episode: { type: [EpisodesSchema], default: [] },
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, require: true },
  short_text: { type: String, require: true },
  text: { type: String, require: true },
  image: { type: String, require: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, ref: "category", require: true },
  comments: { type: [CommentSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  dislikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  type: {
    type: String,
    default: "free" /* free ,cash , special */,
    require: true,
  }, // free - pro
  status : {type : String , default : "notStarted" /*notStarted , completed , holding*/},
  time: { type: String, default: "00:00:00" },
  chapters: { type: [ChapterSchema], default: [] },
  teacher: { type: mongoose.Types.ObjectId, ref: "user", require: true },
  students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" }, //برای اینکه لیست خریداران دوره آموزشیمونو بگیریم اینو میزاریم
});

// step 158 : add index in course model for searching based on text
CourseSchema.index({ title: "text", text: "text", short_text: "text" });

//model name must be capital name
module.exports = {
  CourseModel: mongoose.model("course", CourseSchema),
};
