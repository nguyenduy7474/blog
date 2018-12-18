var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//define schema
var User = mongoose.Schema({
	email: String,
	password: String,
	name: String,
	created_date: Date,
	grant: {type: String, default: "user"}
});

User.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
User.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};
//create model
module.exports = mongoose.model('users', User, 'users');

