const Content = require('../models/content');


class Category{
	static page(req, res){
		res.render('category');
	}

	static getdata(req, res){
		let categoryname = req.body.categoryname
		Content.find({category: categoryname}, function(err, data){
			if(err) throw err
			res.send({data: data});
		})
	}
}

module.exports = Category