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

var _userManager = require('../managers/userManager');

var UserManager = _interopRequireWildcard(_userManager);

var _routineManager = require('../managers/routineManager');

var RoutineManager = _interopRequireWildcard(_routineManager);

var _subRoutineManager = require('../managers/subRoutineManager');

var SubRoutineManager = _interopRequireWildcard(_subRoutineManager);

var _dayManager = require('../managers/dayManager');

var DayManager = _interopRequireWildcard(_dayManager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var superSecret = _config2.default.secret;

function UserRoutes(app, express) {

    var userRouter = express.Router();

    userRouter.route('/users').post(function (req, res, next) {
        var userModel = req.body;
        UserManager.createUser(userModel, next).then(function (user) {
            res.json({
                message: 'User created!',
                user: user
            });
        });
    });

    userRouter.post('/users/login', function (req, res, next) {
        // find the user
        _user2.default.findOne({
            email: req.body.email
        }).select('name password email _id').exec(function (err, user) {

            if (err) next(err);

            // no user with that email was found
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
                        email: user.email
                    }, superSecret);
                    console.log('User logged in: ' + user);
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

    // on routes that end in /users
    // ----------------------------------------------------
    userRouter.route('/users').get(function (req, res, next) {
        var users = UserManager.getUsers();
        res.json(users);
    });

    userRouter.route('/users/:user_id').get(function (req, res, next) {
        var userId = req.params.user_id;
        UserManager.getUser(userId, next).then(function (day) {
            res.json(user);
        });
    }).put(function (req, res, next) {
        var userId = req.params.user_id,
            userModel = req.body;
        UserManager.updateUser(userId, userModel, next).then(function () {
            res.json({
                message: 'User updated!'
            });
        });
    }).delete(function (req, res, next) {
        var userId = req.params.user_id;
        DayManager.deleteAllDaysForUser(userId, next).then(function () {
            SubRoutineManager.deleteAllSubRoutinesForUser(userId, next);
        }).then(function () {
            RoutineManager.deleteAllRoutinesForUser(userId, next);
        }).then(function () {
            UserManager.deleteUser(userId, next);
        }).then(function () {
            res.json({
                message: 'Successfully deleted'
            });
        });
    });

    userRouter.use('/me', function (req, res, next) {
        (0, _tokenHelper2.default)(req, res, next);
    });
    userRouter.get('/me', function (req, res) {
        res.send(req.decoded);
    });

    return userRouter;
}

exports.default = UserRoutes;