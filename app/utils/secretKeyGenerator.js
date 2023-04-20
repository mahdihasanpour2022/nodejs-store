//step 34(part 1): 
// way 1 :kalamie delkhaheto (masalan myfirstbackend ) dar in site (https://emn178.github.io/online-tools/sha256.html) tabdil kon b hash va bde b secret 
// way 2 : (behtare) ya sakhte adade hash shode ba crypto
//crypto male khode node.js hast va mitone bahesh string haie hash shode bsazi 
// dar terminale haminjabzan => cd .\app\utils
// va badesh=> node ./secretKeyGenerator.js  ta inaro behet mide bezar to utils/constants baraie accessToken va refresh token
// A5C2F1831DAE4303DCC5AEC8792C5657C46B4525808B891E1134ED1F5E7803B3
// FA6E82A5653FD3240DBFCFB3EFB60062CB59ED557D7B7BF4A4E70BA1CF266E47

const crypto = require('crypto');
const key = crypto.randomBytes(32).toString("hex").toUpperCase();
// console.log(key)
