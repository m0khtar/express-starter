var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email'
	}, function(username, password, done) {
		User.findOne({
				email: username
			},
			function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Invalid user / password'
					});
				}
				user.validPassword(password, function(err, isMatch) {
					if (err) return done(err);
					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, {
							message: 'Invalid user / password'
						});
					}
				});
			});
	}));
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passReqToCallback: true
	}, function(req, username, password, done) {
		User.findOne({
			email: username
		}, function(err, user) {
			if (user) {
				return done(null, false, {
					message: 'Email already taken.'
				});
			}
			var user = new User({
				email: req.body.email,
				password: req.body.password
			});
			user.save(function(err) {
				if (err) return done(err);
				return done(null, user);
			});
		});
	}));
};