var Login = require('../app/controllers/login');

module.exports = function (app, passport) {
	app.get('/login', Login.login);

    // process the login form
    /*app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));*/
    app.post('/authen', Login.authen);
    app.post('/signup', Login.signup);
}