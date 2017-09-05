var jwt =require('jsonwebtoken');
var token;
module.exports.authenticate=function(data,cb){

  token =jwt.sign(data,process.env.SECRET_KEY,{

    expiresIn:600000
});
  cb(token)  
}

module.exports.logout=function(){
  var token=null;
}