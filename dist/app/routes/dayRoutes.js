'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _day = require('../models/day');

var _day2 = _interopRequireDefault(_day);

var _tokenHelper = require('../helpers/tokenHelper');

var _tokenHelper2 = _interopRequireDefault(_tokenHelper);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DayRoutes(app, express) {

    var dayRouter = express.Router();

    dayRouter.use('/routines/:routine_id/days', function (req, res, next) {
        (0, _tokenHelper2.default)(req, res, next);
    });
    dayRouter.route('/routines/:routine_id/days').post(function (req, res, next) {

        var day = new _day2.default();
        day.date = req.body.date;
        day.value = req.body.value;
        day.routineId = req.params.routine_id;
        day.createdDate = (0, _moment2.default)().valueOf();
        day.modifiedDate = (0, _moment2.default)().valueOf();
        day.userId = req.decoded.id;

        console.log('Creating new day: ' + day);

        day.save(function (err) {
            if (err) {
                console.log('Error creating day : ' + err);
                return next(err);
            }
            console.log("day Created");
            res.json({
                message: 'day created!',
                day: day
            });
        });
    }).get(function (req, res, next) {
        _day2.default.find({
            userId: req.decoded.id,
            routineId: req.params.routine_id
        }, function (err, days) {
            if (err) {
                console.log('Error getting days: ' + err);
                return next(err);
            }
            // return the days
            res.json(days);
        });
    });

    dayRouter.route('/days/:day_id').get(function (req, res, next) {
        _day2.default.findById(req.params.day_id, function (err, day) {
            if (!day) {
                var notFound = new Error("day not found");
                notFound.status = 404;
                return next(notFound);
            }

            if (err) {
                console.log('Error getting day: ' + err);
                next(err);
            }
            console.log('Retrieving day: ' + day);
            // return that day
            res.json(day);
        });
    })

    // update the day with this id
    .put(function (req, res, next) {
        _day2.default.findById(req.params.day_id, function (err, day) {

            if (err) {
                console.log('Error updating day: ' + err);
                next(err);
            }

            if (req.body.value) day.value = req.body.value;
            if (req.body.date) day.date = req.body.date;
            day.modifiedDate = (0, _moment2.default)().valueOf();
            day.save(function (err) {
                if (err) {
                    next(err);
                }
                console.log('Updating day: ' + day);
                res.json({
                    message: 'day updated!',
                    day: day
                });
            });
        });
    }).delete(function (req, res, next) {
        _day2.default.remove({
            _id: req.params.day_id
        }, function (err, day) {

            if (!day) {
                var notFound = new Error("day not found");
                notFound.status = 404;
                return next(notFound);
            }

            if (err) {
                console.log('Error deleting day: ' + err);
                next(err);
            }
            console.log("day deleted");
            res.json({
                message: 'Successfully deleted'
            });
        });
    });

    dayRouter.route('/routines/:routine_id/subRoutines/:subRoutine_id/days').post(function (req, res, next) {

        var day = new _day2.default();
        day.date = req.body.date;
        day.value = req.body.value;
        day.routineId = req.params.routine_id;
        day.subRoutineId = req.params.subRoutine_id;
        day.createdDate = (0, _moment2.default)().valueOf();
        day.modifiedDate = (0, _moment2.default)().valueOf();
        day.userId = req.decoded.id;

        console.log('Creating new day: ' + day);

        day.save(function (err) {
            if (err) {
                console.log('Error creating day : ' + err);
                return next(err);
            }
            console.log("day Created");
            res.json({
                message: 'day created!',
                day: day
            });
        });
    }).get(function (req, res, next) {
        _day2.default.find({
            userId: req.decoded.id,
            routineId: req.params.routine_id,
            subRoutineId: req.params.subRoutine_id
        });
    }, function (err, days) {
        if (err) {
            console.log('Error getting days: ' + err);
            return next(err);
        }
        // return the days
        res.json(days);
    });

    return dayRouter;
}

exports.default = DayRoutes;