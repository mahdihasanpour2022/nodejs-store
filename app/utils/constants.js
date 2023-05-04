// step 30 : maghadire pish farz capital mizarim k hame ja beshe estefade kone

const { object } = require("@hapi/joi");

//step 34(part 2) :
// قدم 1
// برو در سواگر و دقیقا  موارد زیر رو که روت های پروژه تو هستند بعنوان پرمیشن از قسمت ساخت پرمیشن بساز
//all   courses    blogs   products   category   user
// قدم 2
// در سواگر در قسمت گرفتن هکه پرمیشن ها ایدی پرمیشنهایی که ساختی رو و اینکه مال کدوم روت هست یادداشت کن مثلا پرمیشن کتگوری هست و فلان ایدی رو داره
// قدم 3
// برو در سواگر برای رل های زیر از قسمت ساخت رل ، رل بساز و مطابق قسمت پرمیشن این زیر که گفته هر رلی به کدوم روت دسترسی داره به رلی که داری میسازی ایدی این پرمیشن ها رو بده
// قدم 4
// اگر لازم شد روت جدیدی بسازی علاوه بر اینکه در سواگر براش پرمیشن میسازی و به رولی که بایستی بهش دسترسی داشته باشه میدی، بلکه باید در سواگر ساخت پرمیشن به قسمت اینام پراپرتی اون روت رو اضافه کنی
module.exports = {
  MONGO_ID_PATTERN: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  ROLES: Object.freeze({
    SUPERADMIN:"SUPERADMIN",
    ADMIN: "ADMIN",
    USER: "USER",
    CONTENT_MANAGER: "content_manager",
    TEACHER: "TEACHER",
    SUPPLIER: "SUPPLIER",
  }),
  PERMISSIONS: Object.freeze({ // 
    SUPERADMIN:["all"],
    ADMIN:["all"],
    USER:["user"],
    CONTENT_MANAGER:["courses", "blogs" , "category","products"],
    TEACHER:["courses", "blogs"],
    SUPPLIER:["products"],
  }),
  ACCESS_TOKEN_SECRET_KEY:
  "A5C2F1831DAE4303DCC5AEC8792C5657C46B4525808B891E1134ED1F5E7803B3",
  REFRESH_TOKEN_SECRET_KEY:
    "FA6E82A5653FD3240DBFCFB3EFB60062CB59ED557D7B7BF4A4E70BA1CF266E47",
  GHASEDAK_APIKEY:
    "03be377d8a64ec24caed9b516c7ae38b937467442effa5e4f0e3e0da85387a44", // ino az site ghasedak gerefti
};
