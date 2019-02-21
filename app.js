var express = require('express');
let useronline = 0
//test cai gi
var app = express();
var multer = require('multer')
var constants = require('constants');
var constant = require('./config/constants');
var expressSanitizer = require('express-sanitizer');


var port = process.env.PORT || 8042;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
//configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database


require('./config/passport')(passport); // pass passport for configuration

//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'ejs'); // set up ejs for templating


//required for passport
//app.use(session({ secret: 'iloveyoudear...' })); // session secret

app.use(session({
    secret: 'I Love VietNam...',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
var routePath="./routers/"; //add one folder then put your route files there my router folder name is routers
fs.readdirSync(routePath).forEach(function(file) {
    var route=routePath+file;
    require(route)(app, passport);
});
app.use(function(req, res, next) {
  if((req.session != undefined) && (req.session != null) && (req.session.user != undefined)) res.locals.user = req.session.user;
  next();
});// load our routes and pass in our app and fully configured passport


//launch ======================================================================
//app.listen(port);
let CountView = require('./app/models/viewonpage')
var server = require("http").Server(app);
var io = require("socket.io")(server);
var http = require("http");

server.listen(port);


io.on('connection', function(socket){
	CountView.findOne({}, function(err, data){
		if(err) throw err

		if(data){
			data.countview = data.countview + 1
		}else{
			let datasave = {
				countview: 1
			}
			data = new CountView(datasave)
		}

		data.save((errs) => {
			if(err) throw errs

			io.emit('count view', data);
			useronline++
			io.emit('a user connected', useronline);
			socket.on('disconnect', function(){
			useronline--
				io.emit('a user disconnected', useronline);
			});
		})

	})
});

setInterval(function() {
    http.get("http://blogcuaduy.herokuapp.com");
}, 300000); // every 5 minutes (300000)


console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});
exports = module.exports = app;
