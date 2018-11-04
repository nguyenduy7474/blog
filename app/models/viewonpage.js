var mongoose = require('mongoose');

//define schema
var CountView = mongoose.Schema({
	countview: Number
});

//create model
module.exports = mongoose.model('countview', CountView, 'countview');