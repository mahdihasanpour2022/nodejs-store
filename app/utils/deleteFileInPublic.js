// step 104 :
const fs = require("fs");
const path = require("path");

function deleteFileInPublic (fileAddress){
  // console.log("fileAddress :",fileAddress)
  // console.log("complete address : ",__dirname , ".." , ".." ,"public", fileAddress)
  // adrese kamele file ro migirim
 const completePathFile = path.join(__dirname , ".." , ".." ,"public", fileAddress);
 // hazfesh mikonim
 fs.unlinkSync(completePathFile)
};
module.exports = {
  deleteFileInPublic
};