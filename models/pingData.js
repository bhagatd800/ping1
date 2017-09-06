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
	repeatTime: {
		type: String
	}

});

var pingdata = module.exports = mongoose.model('pingdata', PingSchema);


module.exports.createPingData= function(newData, callback){
	
		 newData.save(callback);
}

module.exports.findData=function(id,cb){
	pingdata.findOne({_id:id},cb)
}

module.exports.getData=function(id,cb){
	pingdata.find({userId:id},cb)
}

module.exports.deleteData=function(id,cb){
	pingdata.remove({_id:id},cb);
}


module.exports.update=function(id,newData,callback){
	console.log(newData.familyName);
	console.log(id);
	pingdata.findByIdAndUpdate({_id:id},newData,callback);
	//pingdata.update({'_id':id},{'familyName':newData.familyName,'ip':newData.ip,'port':newData.port,'pingTime':newData.pingTime,'repeatTime':newData.pingTime},{upsert:true},callback);
}