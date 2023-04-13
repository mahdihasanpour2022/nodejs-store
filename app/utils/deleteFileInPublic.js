// step 104 :
const fs = require("fs");
const path = require("path");

function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    // console.log("fileAddress :",fileAddress)
    // console.log("complete address : ",__dirname , ".." , ".." ,"public", fileAddress)
    // adrese kamele file ro migirim
    const completePathFile = path.join(
      __dirname,
      "..",
      "..",
      "public",
      fileAddress
    );
    // baraie check kardane vojode ye masir path az in use kon => fs.existsSync(yout path ...)
    if (fs.existsSync(completePathFile)) fs.unlinkSync(completePathFile); //agar vojod dasht hazfesh mikonim
  }
}
module.exports = {
  deleteFileInPublic,
};
