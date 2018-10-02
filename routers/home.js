var Home = require('../app/controllers/home');

//you can include all your controllers

module.exports = function (app, passport) {

    /*app.get('/login', home.login);
    app.get('/signup', home.signup);*/

    app.get('/', Home.homepage);//home
    app.get('/home', Home.homepage);//home
    app.post('/getallpost', Home.getallpost);//home
    app.post('/search', Home.searching);//home
}
