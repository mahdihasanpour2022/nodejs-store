// step 124 :
const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");
const {calculateCourseTotalTime} = require("../utils/calculateCourseTotalTime");

// dataie k baraie episode baiad ersal beshe ina hast
const EpisodesSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    text: { type: String, require: true },
    type: { type: String, default: "unlock" }, // lock or unlock
    time: { type: String, require: true },
    videoAddress: { type: String, require: true },
  },
  { toJSON: { virtuals: true } }
);
// step 227 : روی هر اسکیمایی خواستین ویرچوال بزنید باید در جی سلانش ویرچوال رو فعال کنید.
//vase  liara1 taghieresh bede
// کلا ویرپوال زمانیه که بخوایم در مورد یک نوع درخواست مثلا گت کردن ما یک چیزی به نتیجه ارسالی اضافه کنیم یا یه چیزی رو در نتیجه نهایی تغییر بدیم
EpisodesSchema.virtual("videoURL").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`;
});

const ChapterSchema = new mongoose.Schema({
  title: { type: String, require: true },
  text: { type: String, default: "" },
  episodes: { type: [EpisodesSchema], default: [] },
});

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    short_text: { type: String, require: true },
    text: { type: String, require: true },
    image: { type: String, require: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, ref: "category", require: true }, // ref iani az ro model category negah kone
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
    status: {
      type: String,
      default: "notStarted" /*notStarted , completed , holding*/,
    },
    // time: { type: String, default: "00:00:00" },
    chapters: { type: [ChapterSchema], default: [] },
    teacher: { type: mongoose.Types.ObjectId, ref: "user", require: true },
    students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" }, //برای اینکه لیست خریداران دوره آموزشیمونو بگیریم اینو میزاریم
  },
  { toJSON: { virtuals: true } }
);

// step 158 : add index in course model for searching based on text
CourseSchema.index({ title: "text", text: "text", short_text: "text" });

// step 226:روی هر اسکیمایی خواستین ویرچوال بزنید باید در جی سلانش ویرچوال رو فعال کنید.
// baraie req haie get ye imageURL dar har course bzar va boro to .env va in 2 ta motaghaiere ro ezafe mikonim b ebtedaie image k dar har course hast
//vase  liara1 taghieresh bede
CourseSchema.virtual("imageURL").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`;
});

// step 237 : محاسبه مجموع تایم اپیزود های درون چپتر های دوره
CourseSchema.virtual("totalTime").get(function () {
  return calculateCourseTotalTime(this.chapters || []);
});

//model name must be capital name
module.exports = {
  CourseModel: mongoose.model("course", CourseSchema),
};
