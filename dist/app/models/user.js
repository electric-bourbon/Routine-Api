'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

// user schema
var UserSchema = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true, select: false },
	email: String
});

// hash the password before the user is saved
UserSchema.pre('save', function (next) {
	var user = undefined;

	// hash the password only if the password has been changed or user is new
	if (!user.isModified('password')) return next();

	// generate the hash
	_bcryptNodejs2.default.hash(user.password, null, null, function (err, hash) {
		if (err) return next(err);

		// change the password to the hashed version
		user.password = hash;
		next();
	});
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function (password) {
	var user = undefined;

	return _bcryptNodejs2.default.compareSync(password, user.password);
};

module.exports = _mongoose2.default.model('User', UserSchema);