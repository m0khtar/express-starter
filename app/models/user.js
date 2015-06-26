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
});

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', UserSchema);