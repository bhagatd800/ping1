var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var PingSchema = mongoose.Schema({
	
	familyName: {
		type: String,
		index:true
	},
	userId:{
		type:String,
	},
	ip: {
		type: String
	},
	port: {
		type: String
	},
	pingTime: {
		type: String
	},
	alterTime: {
		type: String
	},
	repeatTime: {
		type: String
	}

});

var pingData = module.exports = mongoose.model('pingData', PingSchema);


module.exports.createPingData= function(newData, callback){
	
		 newData.save(callback);
}

module.exports.findData=function(id,cb){
	pingData.findOne({_id:id},cb)
}

module.exports.getData=function(id,cb){
	pingData.find({userId:id},cb)
}

module.exports.deleteData=function(id,cb){
	pingData.remove({_id:id},cb);
}