var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	passport.use('local-login', new LocalStrategy({
		//passReqToCallback: true
	}, function(username, password, done) {
		User.findOne({
				$or: [{
					username: username
				}, {
					email: username
				}]
			},
			function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Unknown user'
					});
				}
				user.validPassword(password, function(err, isMatch) {
					if (err) return done(err);
					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, {
							message: 'Invalid password'
						});
					}
				});
			});
	}));
};