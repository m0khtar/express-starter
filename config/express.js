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

	//middleware
	app.use(favicon('./public/favicon.ico'));
	app.use(methodOverride());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(cookieParser());
	app.use(session({
		secret: config.secret,
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: config.sessionMaxAge
		}
	}));
	app.use(passport.initialize());
	app.use(passport.session());
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
	app.use(flash());
	if ('development' == app.get('env')) {
		app.use(morgan('dev'));
	} else {
		app.use(compress());
		app.set('trust proxy', 1)
		session.cookie.secure = true
	}
	app.use('/static', express.static('public'));

	//routes
	require('../app/routes/index')(app);
	//load all routes first
	if ('development' == app.get('env')) {
		app.use(errorHandler());
	}
	app.use(cleanup());
	return app;
};