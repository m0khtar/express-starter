var config = require('./config'),
	express = require('express'),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	compress = require('compression'),
	session = require('express-session'),
	morgan = require('morgan'),
	flash = require('connect-flash'),
	errorHandler = require('errorhandler'),
	lusca = require('lusca'),
	path = require('path'),
	cleanup = require('../app/middlewares/cleanup'),
	passport = require('passport'),
	LocalStrategy = require('passport-local');

module.exports = function() {
	var app = express();
	app.set('env', 'development');

	//config
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, '../app/views'));
	app.set('view engine', 'jade');
	app.locals.env = app.get('env');

	//middleware
	app.use(favicon('./public/favicon.ico'));
	if ('development' == app.get('env')) {
		app.use(morgan('dev'));
	} else {
		app.use(compress());
	}
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(methodOverride());
	var sess = {
		secret: config.secret,
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: config.sessionMaxAge
		}
	};
	if ('production' == app.get('env')) {
		app.set('trust proxy', 1)
		sess.cookie.secure = true;
	}
	app.use(session(sess));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
	app.use(lusca({
		csrf: true,
		xframe: 'SAMEORIGIN',
		hsts: {
			maxAge: 31536000,
			includeSubDomains: true,
			preload: true
		},
		xssProtection: true
	}));

	app.use('/static', express.static('public'));

	//routes
	require('../app/routes/index')(app, passport);
	//load all routes first
	if ('development' == app.get('env')) {
		app.use(errorHandler());
	}
	//app.use(cleanup());
	return app;
};