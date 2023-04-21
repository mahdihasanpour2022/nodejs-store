// step 25 :
const otpGenerator = require("otp-generator");

function randomNumberGenerator() {
  // way1 :
  // return +Math.floor(Math.random() * 90000).toString().slice(0, 5);
  // way 2 :
  // sakhte otp ba packaje otpGenerator
  return otpGenerator.generate(5, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
}
module.exports = {
  randomNumberGenerator,
};
