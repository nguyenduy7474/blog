const Content = require('../models/content');

class SinglePost {
	static post(req, res){
		let postid = req.params.idpost;

		Content.findOne({_id: postid}, function (err, found) {
			if(found){
				console.log(found);
				res.render('singlepost', {found: found});
			}else{
				res.render('404');
			}
		})
	}

	static getsinglepost(req, res){
		let id= req.body.id;
		Content.findOne({_id: id}, function(err, data){
			res.send(data);
		})
	}
}

module.exports = SinglePost;