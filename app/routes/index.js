var homeController = require('../controllers/home'),
	usersController = require('../controllers/users');

module.exports = function(app) {
	app.route('/')
		.get(homeController.index);

	//users
	app.route('/login')
		.get(usersController.renderLogin);
	app.route('/signup')
		.get(usersController.renderSignup);
};