var mongoose = require('mongoose');

//define schema
var Comment = mongoose.Schema({
	type: {type: String, "default": "comment"},
	idpost: String,
	name: String,
	date: String,
	comment: String
});

//create model
module.exports = mongoose.model('Comment', Comment, 'content');