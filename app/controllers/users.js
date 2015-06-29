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
		res.render('signup', {
			message: req.flash('error') || req.flash('info')
		});
	},
	login: function(req, res, next) {
		if (req.user) return res.redirect('/');
		passport.authenticate('local-login', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		})(req, res, next)
	},
	signup: function(req, res, next) {
		if (req.user) return res.redirect('/');
		passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/signup',
			failureFlash: true
		})(req, res, next)
	},
	logout: function(req, res) {
		req.logout();
		res.redirect('/');
	}
};