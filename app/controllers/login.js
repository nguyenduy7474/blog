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
		User.findOne(data, function(err, found){
			if(found){
				req.session.user = found.email
				res.send({success : "1", status : 200});
			}else{
				res.send({failed : "1", status : 200});
			}
		})

	}

	static async signup(req, res){

		let data = req.body;

		if(data.name !== '' && data.email !== '' && data.password !== ''){
			let user = new User(data)

			user.save((err) => {
				if(err) throw err

				res.send({success : "1", status : 200});
			})
		}else{
				res.send({failed : "1", status : 200});
		}



	}

}

module.exports = Login 

