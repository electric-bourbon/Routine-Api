'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _tokenHelper = require('../helpers/tokenHelper');

var _tokenHelper2 = _interopRequireDefault(_tokenHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var superSecret = _config2.default.secret;

function UserRoutes(app, express) {

	var userRouter = express.Router();

	// ----------------------------------------------------
	userRouter.route('/users')

	// create a user (accessed at POST http://localhost:8080/users)
	.post(function (req, res, next) {

		var user = new _user2.default(); // create a new instance of the User model
		user.name = req.body.name; // set the users name (comes from the request)
		user.username = req.body.username; // set the users username (comes from the request)
		user.password = req.body.password; // set the users password (comes from the request)
		user.email = req.body.email;

		console.log("Creating new user: " + user);

		user.save(function (err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000) {
					var userExists = new Error("The user with that username already exists!");
					userExists.status = 500;
					return next(userExists);
				} else return next(err);
			}
			// return a message
			res.json({ message: 'User created!' });
		});
	});

	userRouter.post('/login', function (req, res, next) {

		// find the user
		_user2.default.findOne({
			username: req.body.username
		}).select('name username password email _id').exec(function (err, user) {

			if (err) next(err);

			// no user with that username was found
			if (!user) {
				var notFound = new Error("Could not find user");
				notFound.status = 404;
				return next(notFound);
			} else if (user) {

				// check if password matches
				var validPassword = user.comparePassword(req.body.password);
				if (!validPassword) {
					var incorrectPassword = new Error("Password was incorrect.");
					incorrectPassword.status = 403;
					return next(incorrectPassword);
				} else {
					// if user is found and password is right
					// create a token
					var token = _jsonwebtoken2.default.sign({
						name: user.name,
						id: user._id,
						username: user.username
					}, superSecret, {
						expiresIn: 172800 // expires in 24 hours
					});
					console.log('User logged in' + user);
					// return the information including token as JSON
					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: token,
						id: user._id
					});
				}
			}
		});
	});

	// route middleware to verify a token
	userRouter.use('/users', function (req, res, next) {
		(0, _tokenHelper2.default)(req, res, next);
	});

	// test route to make sure everything is working
	// accessed at GET http://localhost:8080/api
	userRouter.get('/', function (req, res) {
		res.json({ message: 'hooray! welcome to our api!' });
	});

	// on routes that end in /users
	// ----------------------------------------------------
	userRouter.route('/users').get(function (req, res, next) {

		_user2.default.find({}, function (err, users) {
			if (err) {
				return next(err);
			}
			// return the users
			res.json(users);
		});
	});

	userRouter.route('/users/:user_id').get(function (req, res, next) {
		_user2.default.findById(req.params.user_id, function (err, user) {
			if (!user) {
				var notFound = new Error("User not found");
				notFound.status = 404;
				return next(notFound);
			}

			if (err) {
				next(err);
			}
			console.log('Retrieving user ' + user);
			// return that user
			res.json(user);
		});
	})

	// update the user with this id
	.put(function (req, res, next) {
		_user2.default.findById(req.params.user_id, function (err, user) {

			if (err) {
				next(err);
			}

			// set the new user information if it exists in the request
			if (req.body.name) user.name = req.body.name;
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;
			if (req.body.email) user.email = req.body.email;
			// save the user
			user.save(function (err) {
				if (err) {
					next(err);
				}
				console.log("Updating user " + user);
				res.json({ message: 'User updated!' });
			});
		});
	}).delete(function (req, res, next) {
		_user2.default.remove({
			_id: req.params.user_id
		}, function (err, user) {

			if (!user) {
				var notFound = new Error("User not found");
				notFound.status = 404;
				return next(notFound);
			}

			if (err) {
				next(err);
			}
			res.json({ message: 'Successfully deleted' });
		});
	});
	// route middleware to verify a token
	userRouter.use('/me', function (req, res, next) {
		(0, _tokenHelper2.default)(req, res, next);
	});
	// api endpoint to get user information
	userRouter.get('/me', function (req, res) {
		res.send(req.decoded);
	});

	return userRouter;
}

exports.default = UserRoutes;