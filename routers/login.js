var Login = require('../app/controllers/login');
var passport = require('passport');

module.exports = function (app, passport) {


    // process the login form
    /*app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));*/
    app.get('/login', Login.login);

    app.post('/authen', function(req, res, next){
	  passport.authenticate('local-login', function(err, user, info) {
	  	if (err) return next(err)
	  	if(info){
	  		return res.send({error: info.error, status: 200})
	  	}else{
	  		return res.send({success: "1", status: 200})
	  	}
	  })(req, res, next)
	});

    app.post('/signup', function(req, res, next) {
	  passport.authenticate('local-signup', function(err, user, info) {
	  	if (err) return next(err)
	  	return res.send({success: info.success, status: 200})
	  })(req, res, next)
	})
}