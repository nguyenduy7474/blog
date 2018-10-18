var Admin = require('../app/controllers/admin');
var Login = require('../app/controllers/login');
var multer = require("multer");
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/img/blog-img/'); // set the destination
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + "_" + file.originalname); // set the file name and extension
    }
});
const upload = multer({storage: storage,
                          fileFilter: function (req, file, cb) {

                            var filetypes = /jpeg|jpg|png/;
                            var mimetype = filetypes.test(file.mimetype);
                            var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

                            if (mimetype && extname) {
                              return cb(null, true);
                            }
                            cb(null, false);
                          }
                    });

//you can include all your controllers

module.exports = function (app, passport) {

    /*app.get('/login', home.login);
    app.get('/signup', home.signup);*/

    app.get('/admin', Login.loggedIn, Admin.admin);//home
    app.post('/checkadmin', Login.loggedIn, Admin.checkadmin);//home
    app.post('/savepost', upload.single('image'), Admin.savepost);//home
    app.post('/deletepost', Login.loggedIn, Admin.deletepost);//home
    app.post('/getcontentdata', Login.loggedIn, Admin.getcontentdata)
    app.post('/logout', Login.loggedIn, Admin.logout);//home
    app.post('/getallusers', Login.loggedIn, Admin.getallusers);//home
    app.post('/deleteuser', Login.loggedIn, Admin.deleteuser);//home
}

