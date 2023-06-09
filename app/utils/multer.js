// step 99 : yarn add multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

function createRoute(req) {
  // console.log("req.body:::",req.body)
  // ijade zaman
  const date = new Date();
  const Year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const Day = date.getDate().toString();
  // ye masir taeen konim
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "blogs",
    Year,
    month,
    Day
  );
  // har jaie file image upload kardim masresho inja dashte bashim va chon
  // dar khate 43 server.js mibinim k public b onvane pish farze masir taeen shode pas dge inja az public adres nemidim
  req.body.fileUploadPath = path.join("uploads", "blogs", Year, month, Day);
  // hala baiad bgi to in masir poshe bsaze
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

// __dirname iani masiro ta inja bgir , hala az inja bia to in masir , join kon ba in

// agar mouse ror roie kalamie destination negah dari minevise chi mikhad hefz nakon
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("distination :",req.body)
    if (file?.originalname) {
      const filePath = createRoute(req);
      return cb(null, filePath);
    }
    cb(null, null);
    
  },
  filename: (req, file, cb) => {
    // console.log("filename :",req.body)
    if (file?.originalname) {
      // console.log(file)
      // joda kardane type file
      const ext = path.extname(file.originalname); // format mide
      const fileName = String(new Date().getTime() + ext);
      // ino to body zakhire mikonim k hamishe behesh dastresi dashte bashim
      req.body.filename = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});
// step 103 :
function fileFilter(req, file, cb) {
  // dar file agar console.log bgiri mibini k mimetype hast pas list mimetype mojazemono midim k agar to ina bod zakhire bshe
  const ext = path.extname(file.originalname); // formate file ro mide
  const mimetype = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".jfif"];
  if (mimetype.includes(ext)) {
    return cb(null, true); // in true iani bale hich moshkeli nadare
  }
  // dar gheir insorat agar formate to req.body.filename chizi gheire ina bod error bde
  return cb(createHttpError.BadRequest("فرمت ارسال شده تصویر صحیح نیست."));
}


// step 105 : 
// agar validation k dar blog.schema anjam mishe vase formate image error dad
//  va goft support nemishe baiad az zakhire shodanesh to in masir public ba in function fileFilter jelogiri konim
// dar ES6 mishe benevisi faghat fileFilter
// limits size file ro taeen mikone k db por nashe
//or ...  const maxSize = 1*1000*1000; // har 1 mb = 1,000 kilo byte va har 1 kb = 1,000 b
const pictureMaxSize = 0.4 * 1000 * 1000;
// in makhsose file hast
const uploadFile = multer({
  storage,
  limits: { fileSize: pictureMaxSize },
  fileFilter,
});


// step 213 : morede estefade az episode controller
function videoFilter(req, file, cb) {
  // dar file agar console.log bgiri mibini k mimetype hast pas list mimetype mojazemono midim k agar to ina bod zakhire bshe
  const ext = path.extname(file.originalname); // formate file ro mide
  const mimetype = [".mp4", ".mpg", ".mov", ".mkv", ".avi"];
  if (mimetype.includes(ext)) {
    return cb(null, true); // in true iani bale hich moshkeli nadare
  }
  // dar gheir insorat agar formate to req.body.filename chizi gheire ina bod error bde
  return cb(createHttpError.BadRequest("فرمت ارسال شده ویدئو صحیح نیست."));
};
// step 214 :
// in makhsose video hast
const videoMaxSize = 300 * 1000 * 1000; // ta 300Mb mojaz b upload ast
const uploadVideo = multer({
  storage,
  limits: { fileSize: videoMaxSize },
  videoFilter,
});

module.exports = {
  uploadFile,
  uploadVideo
};