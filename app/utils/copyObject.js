// step 148: امن ترین روش برای کپی کردن آبجکت های دریافتی است
// همیشه آبجکتی میگیری این کار رو روش بکن

function copyObject (object){
return JSON.parse(JSON.stringify(object));
};
module.exports = {copyObject}