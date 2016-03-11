'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dayManager = require('../managers/dayManager');

var DayManager = _interopRequireWildcard(_dayManager);

var _tokenHelper = require('../helpers/tokenHelper');

var _tokenHelper2 = _interopRequireDefault(_tokenHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function DayRoutes(app, express) {

    var dayRouter = express.Router();

    dayRouter.use('/routines/:routine_id/days', function (req, res, next) {
        (0, _tokenHelper2.default)(req, res, next);
    });

    dayRouter.route('/routines/:routine_id/days').post(function (req, res, next) {
        var userId = req.decoded.id,
            dayModel = req.body,
            routineId = req.params.routineId;
        DayManager.createDayForRoutine(routineId, dayModel, userId, next).then(function (day) {
            res.json({
                message: 'day created!',
                day: day
            });
        });
    }).get(function (req, res, next) {
        var routineId = req.params.routine_Id,
            userId = req.decoded.id;
        DayManager.getDaysForRoutine(routineId, userId, next).then(function (days) {
            res.json(days);
        });
    });

    dayRouter.route('/days/:day_id').get(function (req, res, next) {
        var dayId = req.params.day_id;
        DayManager.getDay(dayId, next).then(function (day) {
            res.json(day);
        });
    }).put(function (req, res, next) {
        var dayId = req.params.day_id,
            dayModel = req.body;
        DayManager.updateDay(dayId, dayModel, next).then(function () {
            res.json({
                message: "day updated!"
            });
        });
    }).delete(function (req, res, next) {
        var dayId = req.params.day_id;
        DayManager.deleteDay(dayId, next).then(function () {
            res.json({
                message: 'Successfully deleted'
            });
        });
    });

    dayRouter.route('/routines/:routine_id/subRoutines/:subRoutine_id/days').post(function (req, res, next) {
        var dayModel = req.body,
            subRoutineId = req.params.subRoutine_id,
            routineId = req.params.routine_id,
            userId = req.decoded.id;
        DayManager.createDayForSubRoutine(routineId, subRoutineId, dayModel, userId, next).then(function (day) {
            res.json({
                message: 'day created!',
                day: day
            });
        });
    }).get(function (req, res, next) {
        var subRoutineId = req.params.subRoutine_id,
            userId = req.decoded.id;
        DayManager.getDaysForSubRoutine(subRoutineId, userId, next).then(function (days) {
            res.json(days);
        });
    });

    return dayRouter;
}

exports.default = DayRoutes;