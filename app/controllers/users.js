var passport = require('passport');

module.exports = {
	renderLogin: function(req, res) {
		if (req.user) return res.redirect('/');
		res.render('login', {
			message: req.flash('error') || req.flash('info')
		});
	},
	renderSignup: function(req, res) {
		if (req.user) return res.redirect('/');
		res.render('signup');
	},
	login: function(req, res, next) {
		passport.authenticate('local-login', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		})(req, res, next)
	},
	signup: function(req, res, next) {
		if (req.user) return res.redirect('/');
	},
	logout: function(req, res) {
		req.logout();
		res.redirect('/');
	}
};