var mongoose = require('mongoose');

//define schema
var Content = mongoose.Schema({
	type: String,
	title: String,
	content: String,
	category: String,
	img: String,
	url: String,
	author: String,
	date: String
});

//create model
module.exports = mongoose.model('content', Content, 'content');
