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
		let flag = 0;
		let data = req.body;
		if(data.name == '' || data.email == '' || data.password == ''){
			res.send({failed : "Please input all fields", status : 200});
		}else{
			User.find({}, function(err, found){
				if(err) throw err
				if(found.length > 0){

					found.forEach((user) => {

						if(data.email == user.email){
							flag = 1
							return
						}
					})

					if(flag == 1){
						res.send({failed : "Email existed", status : 200})
					}else{
						let userdata = new User(data)
						userdata.save((err) => {
							if(err) throw err

							res.send({success : "1", status : 200});
						})
					}
				}else{
					data.grant = 'admin'
					let userdata = new User(data)
					userdata.save((err) => {
						if(err) throw err

						res.send({success : "1", status : 200});
					})
				}
			})
		}
	}

}

module.exports = Login 


