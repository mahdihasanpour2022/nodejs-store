//step 25-1 :
const { GHASEDAK_APIKEY } = require("./constants");
const Ghasedak = require("ghasedak");

function ghasedakSendSMS(mobile,OTPcode ) {
  // function ghasedakSendSMS(mobile,OTPcode , isLoggedin = false) {
  let ghasedak = new Ghasedak(GHASEDAK_APIKEY);
  // if(isLoggedin){
  //   // برای ارسال متن  مثلا وقتی لاگین موفق بود پیام بده  به حساب خود با موفقیت وارد شدید.
  //   ghasedak.send({ message: "Hello World!",receptor: "09217101700" , linenumber: "10008566", template: "login"});
  // }
  // if(mobile,OTPcode){
    // برای ارسال otp
    ghasedak.verification({
      receptor: mobile ,
      type: "1", // یعنی فعال
      template: "otp", // نام اون قالبیه که در قسمت سرویس اعتبار سنجی سایت قاصدک ساختی 
      param1: OTPcode,
    });
  // }
}
module.exports = { ghasedakSendSMS };
