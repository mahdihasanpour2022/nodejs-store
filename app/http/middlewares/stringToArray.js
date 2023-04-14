// step 100 : closure iani function k function bname digari ro return kone
//tabdil kardane string b array , iani string || null || undefined => [value] || [...values]

const stringToArray = function (field) {
  return function (req, res, next) {
    if (req.body[field]) {
      if (typeof req.body[field] == "string") {
        if (req.body[field].indexOf("#") >= 0) {
          req.body[field] = req.body[field]
            .split("#")
            .map((item) => item.trim());
        } //check kardane inke array hast ya na
        if (req.body[field].indexOf(",") >= 0) {
          req.body[field] = req.body[field]
            .split("#")
            .map((item) => item.trim());
        } // tag haie ersali az front ya swagger ro tabdil mikone b arraye => ["tag1","tag2" , ...]
      } else if ((req.body[field].constructor).toString().toLowerCase().indexOf("array") >= 0) {
        req.body[field] = req.body[field].map((item) => item.trim()); // trim hazfe faselie khali
      }
    } else {
      req.body[field] = [];
    }
    next();
  };
};

module.exports = {
  stringToArray,
};
