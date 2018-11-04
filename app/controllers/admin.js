const Content = require('../models/content');
var dateObj = new Date();
const fs = require('fs');
const User = require("../models/user");
var xss = require("xss");


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

		data.title = req.sanitize(data.title)
		data.category = req.sanitize(data.category)
		data.content = req.sanitize(data.content)
		data.img = req.sanitize(data.img)

		if(data.id){
			Content.findOne({_id: data.id}, function(err, found){
				if(err) throw err;
				if(data.img){
					let path = process.cwd() + '/public' + found.img;
					if(fs.existsSync(path)){
						fs.unlinkSync(path);
					}
				}else{
					data.img = found.img
				}

				let id = data.id;
				delete data.id;
				Content.updateOne({_id: id}, data, function(errupdate){
					if(errupdate) throw errupdate;
					res.send({success: 1});
				})			
			})

		}else{

			if(!req.file && !data.img){
				res.send("Please choose image");
				return
			}

			Content.insertMany(data, function(err){
				if(err) throw err;
				res.send({success: 1});
			})
		}

	}

	static deletepost(req, res){
		let id = req.body.id;
		let type = req.body.type
		Content.findOne({_id: id}, function(err, found){
			let path = process.cwd() + '/public' + found.img;
			if(fs.existsSync(path)){
				fs.unlinkSync(path);
			}

			if(type == "post"){
				Content.remove({type: "post", _id: id}, function(err){
					if(err) throw err

					Content.remove({type: "comment", idpost: id}, function(errcmt){
						if(errcmt) throw errcmt
						res.send({success: 1})
					})
				})
			}else{
				Content.remove({type: "slide", _id: id}, function(err){
					if(err) throw err
					res.send({success: 1})
				})
			}

		})

	}

	static logout(req, res){
		req.session.destroy()
		res.send({success: 1})
	}

}

module.exports = Admin