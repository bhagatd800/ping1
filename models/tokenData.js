var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var TokenSchema = mongoose.Schema({

	tokenId: {
		type: String,
		index:true
	},
	userId:{
		type:String
	},
	chatId: {
		type: String
	}

});

var token = module.exports = mongoose.model('token', TokenSchema);


module.exports.createToken= function(newData, callback){

	 token.update({'userId':newData.userId},{$set:{'userId':newData.userId,'tokenId':newData.tokenId,'chatId':newData.chatId}},{upsert:true},callback)

}

module.exports.findData=function(userId,cb){
	token.findOne({'userId':userId},cb)
}