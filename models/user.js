var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	userName: {
		type: String,
		unique:true,
		index:true
	},
	password: {
		type: String
	}

});
 
var user = module.exports = mongoose.model('user', UserSchema);


module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}


module.exports.getUserByUsername = function(userName, callback){
	//console.log(username);
	var query = {userName: userName};
	user.findOne(query, callback);
	
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.updatePassword=function(user_id,password,callback){
	
	bcrypt.genSalt(10, function(err, salt) {
	
			bcrypt.hash(password, salt, function(err, hash) {
	
				password = hash;
	
				user.update({ _id: user_id }, { $set: { password: password }}, callback);
	
			});
	
		});
	
		
	
	}

	module.exports.findData=function(cb){
		user.find(cb)
	}