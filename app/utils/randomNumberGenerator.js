// step 25 :
function randomNumberGenerator() {
  return +Math.floor(Math.random() * 90000).toString().slice(0, 5);
};
 
module.exports = {
  randomNumberGenerator
}
