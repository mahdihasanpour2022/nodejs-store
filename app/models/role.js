// step 256 : از این قدم تا قدم 260 رو با دقت نگاه کن روند کلی ساخت بک اند اینه 
// rbac = role base access control
// یعنی دسترسی بر اساس نقشی که داره به قسمت های سایت و صفحات
// role ham ye collection ast
// yani ye schema dar mongoose misazim k ye obj havie key haie mast bad vase vase schema k sakhti ye name mizari va in mishe modele to

const { default: mongoose } = require("mongoose");

// in new mohemme
const RoleSchema = new mongoose.Schema(
  {
    // String  must be capital
    title: { type: String, unique: true }, // یعنی اسم نقش یا رول اینه
    permissions: { // و اجازه دسترسی به این بخش ها که در ارایه هست رو داره
      type: [mongoose.Types.ObjectId], 
      ref: "permissions",
      default: [],
    },
  },
  { toJSON: { virtuals: true } }
); // vase inke virtual kar kone dar toJSON baiad virtuals ro true bezarim

//schema model name must be capital name
module.exports = {
  RoleModel: mongoose.model("role", RoleSchema),
};
