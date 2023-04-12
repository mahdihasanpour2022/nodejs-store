// step 99 : yarn add multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

function createRoute(req) {
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
  req.body.fileUploadPath = path.join("uploads","blogs",Year,month,Day);
  // hala baiad bgi to in masir poshe bsaze
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

// __dirname iani masiro ta inja bgir , hala az inja bia to in masir , join kon ba in

// agar mouse ror roie kalamie destination negah dari minevise chi mikhad hefz nakon
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = createRoute(req);
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    // console.log(file)
    // joda kardane type file
    const ext = path.extname(file.originalname); // format mide
    const fileName = String(new Date().getTime() + ext);
    // ino to body zakhire mikonim k hamishe behesh dastresi dashte bashim
    req.body.filename = fileName;
    cb(null, fileName);
  },
});



function fileFilter(req , file , cb){
  // dar file agar console.log bgiri mibini k mimetype hast pas list mimetype mojazemono midim k agar to ina bod zakhire bshe
  const ext = path.extname(file.originalname); // formate file ro mide
  const mimetype = [".jpg",".jpeg",".png",".gif",".webp",".jfif"];
  if(mimetype.includes(ext)){
    return cb(null , true); // in true iani bale hich moshkeli nadare
  }
  // dar gheir insorat agar formate to req.body.filename chizi gheire ina bod error bde
  return cb(createHttpError.BadRequest("فرمت ارسال شده تصویر صحیح نیست."))
}


// agar validation k dar blog.schema anjam mishe vase formate image error dad 
//  va goft support nemishe baiad az zakhire shodanesh to in masir public ba in function fileFilter jelogiri konim
const uploadFile = multer({ storage ,fileFilter}); // dar ES6 mishe benevisi faghat fileFilter 

module.exports = {
  uploadFile
};
