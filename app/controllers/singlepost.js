const Content = require('../models/content');
const Comment = require('../models/comment');



var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
newdate = day + "/" + month + "/" + year;

class SinglePost {
	static post(req, res){
		let postid = req.params.idpost;

		Content.findOne({_id: postid}, function (err, found) {
			if(err) throw err

			Comment.find({idpost: postid}, function (errcmt, foundcmt) {
			if(errcmt) throw errcmt;

				if(found){
					res.render('singlepost', {found: found, foundcmt: foundcmt, postid: postid});
				}else{
					res.render('404');
				}
				
			})
		})
	}

	static getsinglepost(req, res){
		let id= req.body.id;
		Content.findOne({_id: id}, function(err, data){
			if(err) throw err

			Content.find({type: "comment", idpost: id}, function(errcmt, foundcmt){
				let datasend = {
					data: data,
					datacmt: foundcmt
				}
				res.send(datasend);
			})
		})
	}

	static deletecmt(req, res){
		let idcmt = req.body.idcmt
		Content.remove({_id: idcmt}, function(err){
			if(err) throw err

			res.send({success: true})
		})
	}

	static comment(req, res){
		let data = req.body
		let idpost = data.idpost
		data.date = newdate;
		let comment = new Comment(data)
		comment.save((err) => {
			if(err) throw err

			Comment.find({idpost: idpost}, function (errcmt, foundcmt) {
				if(errcmt) throw errcmt

				res.send(foundcmt);
			})
		})
	}
}

module.exports = SinglePost;