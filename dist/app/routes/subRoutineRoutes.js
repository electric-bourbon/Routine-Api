'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _subRoutine = require('../models/subRoutine');

var _subRoutine2 = _interopRequireDefault(_subRoutine);

var _tokenHelper = require('../helpers/tokenHelper');

var _tokenHelper2 = _interopRequireDefault(_tokenHelper);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SubRoutineRoutes(app, express) {

    var subRoutineRouter = express.Router();

    subRoutineRouter.use('/routines/:routine_id/subRoutines', function (req, res, next) {
        (0, _tokenHelper2.default)(req, res, next);
    });
    subRoutineRouter.route('/routines/:routine_id/subRoutines').post(function (req, res, next) {

        var subRoutine = new _subRoutine2.default();
        subRoutine.name = req.body.name;
        subRoutine.style = req.body.style;
        subRoutine.desiredFrequency = subRoutine.style === '4-day' ? 4 : req.body.desiredFrequency;
        subRoutine.routineId = req.params.routine_id;
        subRoutine.createdDate = (0, _moment2.default)().valueOf();
        subRoutine.modifiedDate = (0, _moment2.default)().valueOf();
        subRoutine.userId = req.decoded.id;

        console.log('Creating new subRoutine: ' + subRoutine);

        subRoutine.save(function (err) {
            if (err) {
                console.log('Error creating subRoutine : ' + err);
                return next(err);
            }
            console.log("subRoutine Created");
            res.json({
                message: 'subRoutine created!',
                subRoutine: subRoutine
            });
        });
    }).get(function (req, res, next) {

        _subRoutine2.default.find({
            userId: req.decoded.id,
            routineId: req.params.routine_id
        }, function (err, subRoutines) {
            if (err) {
                console.log('Error getting subRoutines: ' + err);
                return next(err);
            }
            // return the subRoutines
            res.json(subRoutines);
        });
    });

    subRoutineRouter.route('/routines/:routine_id/subRoutines/:subRoutine_id').get(function (req, res, next) {
        _subRoutine2.default.findById(req.params.subRoutine_id, function (err, subRoutine) {
            if (!subRoutine) {
                var notFound = new Error("subRoutine not found");
                notFound.status = 404;
                return next(notFound);
            }

            if (err) {
                console.log('Error getting subRoutine: ' + err);
                next(err);
            }
            console.log('Retrieving subRoutine: ' + subRoutine);
            // return that subRoutine
            res.json(subRoutine);
        });
    })

    // update the subRoutine with this id
    .put(function (req, res, next) {
        _subRoutine2.default.findById(req.params.subRoutine_id, function (err, subRoutine) {

            if (err) {
                console.log('Error updating subRoutine: ' + err);
                next(err);
            }

            if (req.body.name) subRoutine.name = req.body.name;
            if (req.body.startDate) subRoutine.startDate = req.body.startDate;
            if (req.body.style) subRoutine.style = req.body.style;
            if (req.body.desiredFrequency) subRoutine.desiredFrequency = req.body.desiredFrequency;
            subRoutine.modifiedDate = req.body.modifiedDate;

            subRoutine.save(function (err) {
                if (err) {
                    next(err);
                }
                console.log('Updating subRoutine: ' + subRoutine);
                res.json({
                    message: 'subRoutine updated!'
                });
            });
        });
    }).delete(function (req, res, next) {
        _subRoutine2.default.remove({
            _id: req.params.subRoutine_id
        }, function (err, subRoutine) {

            if (!subRoutine) {
                var notFound = new Error("subRoutine not found");
                notFound.status = 404;
                return next(notFound);
            }

            if (err) {
                console.log('Error deleting subRoutine: ' + err);
                next(err);
            }
            console.log("subRoutine deleted");
            res.json({
                message: 'Successfully deleted'
            });
        });
    });

    return subRoutineRouter;
}

exports.default = SubRoutineRoutes;