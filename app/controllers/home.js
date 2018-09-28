/*var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');*/
const Content = require('../models/content')

class Home {

	static homepage(req, res){
		res.render('index');
	}

	static getallpost(req, res){

		Content.find({}, function (err, found){
			res.send({found: found});
		})
	}

}

module.exports = Home;




    
