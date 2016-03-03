'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _routine = require('../models/routine');

var _routine2 = _interopRequireDefault(_routine);

var _tokenHelper = require('../helpers/tokenHelper');

var _tokenHelper2 = _interopRequireDefault(_tokenHelper);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RoutineRoutes(app, express) {

    var routineRouter = express.Router();

    routineRouter.use('/routines', function (req, res, next) {
        (0, _tokenHelper2.default)(req, res, next);
    });
    routineRouter.route('/routines').post(function (req, res, next) {

        var routine = new _routine2.default();
        routine.name = req.body.name;
        routine.style = req.body.style;
        routine.desiredFrequency = routine.style === '4-day' ? 4 : req.body.desiredFrequency;
        routine.startDate = req.body.startDate;
        routine.createdDate = (0, _moment2.default)().valueOf();
        routine.modifiedDate = (0, _moment2.default)().valueOf();
        routine.userId = req.decoded.id;

        console.log('Creating new routine: ' + routine);

        routine.save(function (err) {
            if (err) {
                console.log('Error creating routine : ' + err);
                return next(err);
            }
            console.log("routine Created");
            res.json({
                message: 'routine created!',
                routine: routine
            });
        });
    }).get(function (req, res, next) {

        _routine2.default.find({
            userId: req.decoded.id
        }, function (err, routines) {
            if (err) {
                console.log('Error getting routines: ' + err);
                return next(err);
            }
            // return the routines
            res.json(routines);
        });
    });

    routineRouter.route('/routines/:routine_id').get(function (req, res, next) {
        _routine2.default.findById(req.params.routine_id, function (err, routine) {
            if (!routine) {
                var notFound = new Error("routine not found");
                notFound.status = 404;
                return next(notFound);
            }

            if (err) {
                console.log('Error deleting routine: ' + err);
                next(err);
            }
            console.log('Retrieving routine: ' + routine);
            // return that routine
            res.json(routine);
        });
    })

    // update the routine with this id
    .put(function (req, res, next) {
        _routine2.default.findById(req.params.routine_id, function (err, routine) {

            if (err) {
                console.log('Error updating routine: ' + err);
                next(err);
            }

            if (req.body.name) routine.name = req.body.name;
            if (req.body.style) routine.style = req.body.style;
            if (req.body.startDate) routine.startDate = req.body.startDate;
            if (req.body.desiredFrequency) routine.desiredFrequency = req.body.desiredFrequency;
            if (req.body.modifiedDate) routine.modifiedDate = req.body.modifiedDate;

            routine.save(function (err) {
                if (err) {
                    next(err);
                }
                console.log('Updating routine: ' + routine);
                res.json({
                    message: 'routine updated!'
                });
            });
        });
    }).delete(function (req, res, next) {
        _routine2.default.remove({
            _id: req.params.routine_id
        }, function (err, routine) {

            if (!routine) {
                var notFound = new Error("routine not found");
                notFound.status = 404;
                return next(notFound);
            }

            if (err) {
                console.log('Error deleting routine: ' + err);
                next(err);
            }
            console.log("routine deleted");
            res.json({
                message: 'Successfully deleted'
            });
        });
    });

    return routineRouter;
}

exports.default = RoutineRoutes;