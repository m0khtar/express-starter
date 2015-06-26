var homeController = require('../controllers/home'),
	usersController = require('../controllers/users'),
	passport = require('passport');

module.exports = function(app) {
	app.route('/')
		.get(homeController.index);

	//users
	app.route('/login')
		.get(usersController.renderLogin)
		.post(passport.authenticate('local-login', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		}));
	//.post(usersController.login);
	app.route('/signup')
		.get(usersController.renderSignup)
		.post(usersController.signup);

	//logout
	app.route('/logout')
		.get(usersController.logout);
};