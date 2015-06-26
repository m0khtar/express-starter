var passport = require('passport');

module.exports = {
	renderLogin: function(req, res) {
		if (req.user) return res.redirect('/');
		res.render('login', {
			//messages: req.flash('errors') || req.flash('info')
			message: req.flash('error')
		});
	},
	renderSignup: function(req, res) {
		if (req.user) return res.redirect('/');
		res.render('signup');
	},
	/*
		login: function(req, res, next) {
			if (req.user) return res.redirect('/');
			passport.authenticate('local-login', function(err, user, info) {
				if (err) return next(err);
				if (!user) {
					req.flash('errors', {
						msg: info.message
					});
					res.status(500).json({
						message: info.message
					});
					return res.redirect('/login');
				}
				req.logIn(user, function(err) {
					if (err) return next(err);
					req.flash('success', {
						msg: 'Success! You are logged in.'
					});
					req.session.user = user;
					res.redirect(req.session.returnTo || '/');
				});
			})(req, res, next);
		},*/

	login: function(req, res, next) {
		passport.authenticate('local-login', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		})(req, res, next)
	},
	/*login: passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}),*/
	signup: function(req, res, next) {
		if (req.user) return res.redirect('/');
	},
	logout: function(req, res) {
		req.logout();
		res.redirect('/');
	}
};