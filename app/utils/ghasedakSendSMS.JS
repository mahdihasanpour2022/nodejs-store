//step 25-1 :
const { GHASEDAK_APIKEY } = require("./constants");
const Ghasedak = require("ghasedak");

function ghasedakSensSMS(mobile,OTPcode) {

  let ghasedak = new Ghasedak(GHASEDAK_APIKEY);
  // برای ارسال متن
  // ghasedak.send({ message: "Hello World!",receptor: "09217101700",linenumber: "10008566" });
  // برای ارسال otp
  ghasedak.verification({
    receptor: mobile ,
    type: "1", // یعنی فعال
    template: "otp", // نام اون قالبیه که در قسمت سرویس اعتبار سنجی سایت قاصدک ساختی 
    param1: OTPcode,
  });
}
module.exports = { ghasedakSensSMS };
