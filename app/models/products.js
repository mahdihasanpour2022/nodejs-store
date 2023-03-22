// step 13 :
const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, require: true },
  short_desc: { type: String, require: true },
  tottal_desc: { type: String, require: true },
  images: { type: [String], require: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, require: true },
  comments: { type: [], default: []  },
  like: { type: [mongoose.Types.ObjectId], default: []  },
  deslike: { type: [mongoose.Types.ObjectId], default: []  },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0  },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String, require: true },
  time: { type: String },
  format: { type: String },
  teacher: { type: mongoose.Types.ObjectId, require: true },
  feature: {
    type: Object,
    default: {
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
