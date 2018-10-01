var Category = require('../app/controllers/category');

//you can include all your controllers

module.exports = function (app, passport) {

    /*app.get('/login', home.login);
    app.get('/signup', home.signup);*/

    app.get('/category/:categoryname', Category.page);//home
    app.post('/getdata', Category.getdata);
}
