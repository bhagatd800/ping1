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
	},
	status:{
		type:String
	},
	position:{
		type:Number
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
}

module.exports.startSetup=function(callback){
	console.log("ksj");
	pingdata.updateMany({},{'status':'stopped'},callback);
}

module.exports.setStatus=function(id,position,callback){
	pingdata.findByIdAndUpdate({_id:id},{'position':position,'status':'running'},callback);
}


module.exports.changeStatus=function(id,callback){
	pingdata.findByIdAndUpdate({_id:id},{'status':'stopped'},callback);
}