// step 125-1 :
function setFeatures (body){
const {width,height,length,weight,colors} = body;
  // باید اگر فرانت نفریتاد مقدارشو براش دیفالت 0 بزاریم اما اگر نه مقدار داشت همون مقداررو در نظر بگیره
      let features = {};
      features.colors = colors ;
      if ( !isNaN(width) || !isNaN(height) || !isNaN(length) || !isNaN(weight)) {
        // اگر یکی از این ویژگی ها رو وارد کرده باشه یعنی کالا فیزیکیه در غیر اینصورت مجازیه
        if (!width) features.width = 0;
        else features.width = width;
        if (!height) features.height = 0;
        else features.height = height;
        if (!length) features.length = 0;
        else features.length = length;
        if (!weight) features.weight = 0;
        else features.weight = weight;
      }
      return features;
    };
    module.exports = {
      setFeatures
    };