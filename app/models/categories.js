// step 12 :
const { default: mongoose } = require("mongoose");

// inja b parent refrence midim b name category va badesh barash virtual tarif mikonim
// va ba gozinie toJson migim k virtual ejazie ijade ye obj jadido dare
const Schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      default: undefined,
    },
  },
  {
    id: false,
    versionKey: false, // iani dar khoroji on parametre __v ro  kolan nazare
    toJSON: {
      virtuals: true,
    },
  }
);

// step 80 :
// dakhele populate ham daghighan hamon mavaredi k dar step 70 dar look up gozashtimo mizarim chon poshte sahnie populate hamon lookaup hast
// in iani har jaie dar proje populate roie categori zadim bia va ye chizi b name children dorost kon va in etelaat ro tosh bzar 
Schema.virtual("children", {
  ref: "category",
  localField: "_id",
  foreignField: "parent",
});

// step 81 : pre ye middleware ast ghabl az anjame tamame method haie mesle findOne k dar  remove/create / get all , ... k to category.controller hast in ejra mishe
// dar call backesh arrow function ro nanevis chon this nemigire alan inja this eshare mikone b hamin method findOne
// next iani anjam dadi tamom shod boro badi iani hamonaie k dar controller hast
// select iani __v ro neshon nade

function autoPopulate(next) {
  this.populate([{ path: "children", select: { __v: 0 , id : 0 } }]); // in iani har ja roie category populate zade shod children hasho neshon bede
  next();
}
Schema.pre("findOne", autoPopulate).pre("find", autoPopulate);

//model name must be capital name
module.exports = {
  CategoryModel: mongoose.model("category", Schema),
};
