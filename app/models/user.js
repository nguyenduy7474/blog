var mongoose = require('mongoose');

//define schema
var User = mongoose.Schema({
	email: String,
	password: String,
	name: String,
	grant: {type: String, default: "user"}
});

//create model
module.exports = mongoose.model('users', User, 'users');

