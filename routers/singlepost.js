var SinglePost = require('../app/controllers/singlepost');


module.exports = function (app, passport) {
	app.get('/post/:posturl.:idpost.html', SinglePost.post);//home
	app.post('/singlepost', SinglePost.getsinglepost);//home
}