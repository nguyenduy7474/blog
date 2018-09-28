const User = require("../models/user");


class Login {

	static loggedIn(req, res, next) {
		if (req.session.user) { // req.session.passport._id

			next();

		} else {

			res.redirect('/login');

		}
	}

	static login(req, res) {
		if (req.session.user) {

			res.redirect('/admin');

		} else {
			res.render('login', {error:"", success:""});

		}
	}

	static async authen(req, res){

		let data = req.body;
		let found = await User.findOne(data)

		if(found){
			req.session.user = found.email
			res.send({success : "1", status : 200});
		}else{
			res.send({failed : "1", status : 200});
		}
	}

}

module.exports = Login 

