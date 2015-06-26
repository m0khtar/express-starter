var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	passport.use('local-login', new LocalStrategy({
		passReqToCallback: true
	}, function(req, username, password, done) {
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
					//return done(null, false, req.flash('error', 'Unknown user'));
				}
				if (!user.validPassword(password)) {
					return done(null, false, {
						message: 'Invalid password'
					});
					//return done(null, false, req.flash('errors', 'Invalid password'));
				}
				return done(null, user);
			});
	}));
};