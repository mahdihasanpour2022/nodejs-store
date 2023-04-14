// step 132 :
const path = require("path");

function listOfImagesFromReq(files, fileUploadPath) {
  // in files ro to req.files darim vali fileUploadPath to req.body hast
  // چک میکنیم اگر در ارایه بیش از یه ایتم بود این کار ها رو بکنه در غیر اینصورت یه ارایه خالی ریترن کنه
  if (files?.length > 0) {
    // ادرس کامل رو به عکس میدیم ک هبه محل ذخیره سازی اون اشاره داره
    console.log("files:", files);
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((item) => item.replace(/\\/g, "/"));
    //در مپ اول ما مسیر کامل رو به عکس میدیم تا در ریسپانس و یا دیتابیس با اون ادرس کامل ذخیره بشه ام در مپ دوم میایم و هر عکس در ارایه رور میگیریم و دو تا // رو تبدیل میکنیم به یه /که درست باشه
    // یعنی در مسیر دو تا // بود و باید ریپلیسش کنیم
  } else {
    return [];
  }
}

module.exports = {
  listOfImagesFromReq,
};
