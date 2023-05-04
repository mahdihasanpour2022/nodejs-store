// step 100 : closure iani function k function bname digari ro return kone
//tabdil kardane string b array , iani string || null || undefined => [value] || [...values]

const stringToArray = function (field ) {
  return function (req, res, next) {
    if (req.body[field]) {
      // console.log("req.body[field]:",req.body[field]); //64539cc30737584c1b39dabe,64539cd60737584c1b39dac2
      if (typeof req.body[field] == "string") {
        if (req.body[field].indexOf("#") >= 0) {
          req.body[field] = req.body[field]
            .split("#")
            .map((item) => item.trim());
        } //check kardane inke array hast ya na
        else if (req.body[field].indexOf(",") >= 0) {
          req.body[field] = req.body[field].split(",").map((item) => item.trim());
        } // tag haie ersali az front ya swagger ro tabdil mikone b arraye => ["tag1","tag2" , ...]
        else {
          // in khato khodam ezafe kardam
          req.body[field] = [req.body[field]];
        }
      } 
      // در نهایت چه ارایه بود چه استرینگ بیاد و فواصل خالی ایتم های درون ارایه رو حذف کنه و بعد موارد تکراری در ارایه رو هم حذف کنه
      if (Array.isArray(req.body[field])) {
        // iani agar ayyay bod
        req.body[field] = req.body[field].map((item) => item.trim()); // trim hazfe faselie khali
        req.body[field] = [...new Set(req.body[field])]; // baese hazfe mavarede tekrari mishe
      }
    } else {
      // console.log(" req.body[field]:  hichi nadare")
      req.body[field] = [];
    }
    next();
  };
};

module.exports = {
  stringToArray,
};
