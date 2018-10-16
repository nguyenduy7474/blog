const Content = require('../models/content');
var dateObj = new Date();
const fs = require('fs');
const User = require("../models/user");

var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
newdate = day + "/" + month + "/" + year;

class Admin {

	static deleteuser(req, res){
		let id = req.body.id
		User.remove({_id: id}, function(err){
			if(err) throw err;
			res.send({success: 1})
		})
	}

	
	static getallusers(req, res){
		User.find({grant: {$not: {$eq: "admin"}}}, function(err, found){
			console.log(found)
			res.send({found: found});
		})
	}

	static admin(req, res){
		res.render('admin');
	}

	static checkadmin(req, res){
		let user = req.session.user;

		User.findOne({email: user}, function (err, found) {
			if(found.grant == 'admin'){
				res.send({admin: true});
			}else{
				res.send({admin: false});
			}
		})
	}


	static getcontentdata(req, res){
		let type = req.body.type
		Content.find({type: type}, function (err, found) {
			res.send({found: found});
		})
	}

	static savepost(req, res){
		let data = JSON.parse(req.body.datasend);
		data.author = req.session.user
		data.date = newdate;
		if(req.file){
			let path = req.file.destination.slice(req.file.destination.indexOf('img') - 1, req.file.destination.length) + req.file.filename
			data.img = path
		}
		if(data.id){
			if(data.img){
				let path = process.cwd() + '/public' + data.img;
				if(fs.existsSync(path)){
					fs.unlinkSync(path);
				}
			}


			let id = data.id;
			delete data.id;
			Content.update({_id: id}, data, function(err){
				if(err) throw err;
				res.send({success: 1});
			})
		}else{
			Content.insertMany(data, function(err){
				if(err) throw err;
				res.send({success: 1});
			})
		}

	}

	static deletepost(req, res){
		let id = req.body.id;
		Content.findOne({_id: id}, function(err, found){
			let path = process.cwd() + '/public' + found.img;
			if(fs.existsSync(path)){
				fs.unlinkSync(path);
			}

			Content.remove({_id: id}, function(err){
				if(err) throw err
				res.send({success: 1})
			})
		})

	}

	static logout(req, res){
		req.session.destroy()
		res.send({success: 1})
	}

}

module.exports = Admin