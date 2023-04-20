// step 13 :
const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");
// یه چیزایی مثل وزن و طول  و ارتفاع رو فرانت داره میده که ما در سند پروداکت اسکیما داریم اعتبار سنجیش میکنیم اما اینجا نیست
const Schema = new mongoose.Schema({
  title: { type: String, require: true },
  text: { type: String, require: true },
  short_text: { type: String, require: true },
  images: { type: [String], require: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId,ref : "category" , require: true },
  comments: { type: [CommentSchema], default: []  },
  likes: { type: [mongoose.Types.ObjectId], default: []  },
  dislikes: { type: [mongoose.Types.ObjectId], default: []  },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0  },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String, require: true }, // vrtual - phisicak product
  format: { type: String },
  supplier: { type: mongoose.Types.ObjectId, require: true },
  feature: {type: Object, default: {
      madeIn: "",
      width: "",
      height: "",
      length: "",
      wigth: "",
      colors: [],
      model: []
    },
  },
});

//model name must be capital name
module.exports = {
  ProductModel: mongoose.model("product", Schema),
};
