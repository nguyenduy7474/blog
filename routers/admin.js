var Admin = require('../app/controllers/admin');
var Login = require('../app/controllers/login');
var multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, process.cwd() + '/public/img/blog-img/'); // set the destination
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + "_" + file.originalname); // set the file name and extension
    }
});
const upload = multer({storage: storage});

//you can include all your controllers

module.exports = function (app, passport) {

    /*app.get('/login', home.login);
    app.get('/signup', home.signup);*/

    app.get('/admin', Login.loggedIn, Admin.admin);//home
    app.post('/savepost', upload.single('image'), Admin.savepost);//home
    app.post('/deletepost', Login.loggedIn, Admin.deletepost);//home
    app.post('/getcontentdata', Login.loggedIn, Admin.getcontentdata)
    app.post('/logout', Login.loggedIn, Admin.logout);//home
}
