// step 257 : پرمیشن زیر مججموعه رول است
//  اصول سالید رو رعایت کردن یعنی هر کلاسی یه کاری رو انجام بده 
const { default: mongoose } = require("mongoose");

const PermissionSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String, default: "" },
  },
  { toJSON: { virtuals: true } }
);

module.exports = {
  PermissionModel: mongoose.model("permission", PermissionSchema),
};
