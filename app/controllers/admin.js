const Content = require('../models/content');
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
const fs = require('fs');

newdate = day + "/" + month + "/" + year;

class Admin {
	static admin(req, res){
		Content.find({}, function (err, found) {
			res.render('admin');
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

		if(req.file){
			if(data.id){
				let path = process.cwd() + '/public' + data.img;
				if(fs.existsSync(path)){
					fs.unlinkSync(path);
				}
			}

			let path = req.file.destination.slice(req.file.destination.indexOf('img') - 1, req.file.destination.length) + req.file.filename
			data.img = path
			data.author = req.session.user
			data.date = newdate;
		}
		if(data.id){
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
}

module.exports = Admin