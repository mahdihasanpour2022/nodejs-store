// step 147-1 :
function deleteInvalidPropertyInObject (data = {}  ,blackListFields = [] ){ // همیشه در ورودی ارگومان فانکشن ها دیفالت بده
  let nullishData = ["", " ", 0, "0", null, undefined];

 // ma nabaiad bezarrim az front end masalan bookmarko ersal bshe
 Object.keys(data).forEach((key) => {
  // validation black list ma k age
  if (blackListFields.includes(key)) delete data[key];
  // validation string
  if (typeof data[key] == "string") data[key] = data[key].trim(); // faselehasho hazf mikonim va dobare to khodesh zakhirash mikonim
  // validation array
  if (Array.isArray(data[key]) && data[key].length > 0)
    data[key] = data[key].map((item) => item.trim()); // age array bod itemhasho trim kone k fasele aval akharesh hazf bshe
  // کلا ما زمان ادیت و آپدیت یک موضوع چون قراره بره در دیتابیس جای دیتاهای قبلی بشینه نباید خالی بفرستیم یا ایراد دار مثلا فاصله داشته باشه ، پس فقط مقادیری که مقداردهی جدید شدن و خالی نیستن رو میفرستیم سمت بک اند
  if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]; // اگر ارایه خالی بود کلا اون پراپرتی حاوی ارایه خالی رو حذف کنه
  if (nullishData.includes(data[key])) delete data[key];
});
return data ; // چون ورودی ما یه آبجکت و یه آرایه است و هر دو از نوع رفرنس تایپ هستند پس نیازی به ریترن کردن نداره اما ما بازم میزاریم
};
module.exports = {deleteInvalidPropertyInObject}