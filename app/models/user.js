var bcrypt = require('bcrypt'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		index: {
			unique: true
		},
		required: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	salt: String,
	createdOn: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', function(next) {
	var user = this;
	this.HashPassword(user, next);
});

UserSchema.methods.HashPassword = function(user, next) {
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.salt = salt;
			user.password = hash;
			next();
		});
	});
};

UserSchema.methods.validPassword = function(password, next) {
	bcrypt.compare(password, this.password, function(err, res) {
		if (err) return next(err);
		next(null, res);
	});
};

mongoose.model('User', UserSchema);