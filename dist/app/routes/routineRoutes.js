'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _routineManager = require('../managers/routineManager');

var RoutineManager = _interopRequireWildcard(_routineManager);

var _subRoutineManager = require('../managers/subRoutineManager');

var SubRoutineManager = _interopRequireWildcard(_subRoutineManager);

var _dayManager = require('../managers/dayManager');

var DayManager = _interopRequireWildcard(_dayManager);

var _tokenHelper = require('../helpers/tokenHelper');

var _tokenHelper2 = _interopRequireDefault(_tokenHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function RoutineRoutes(app, express) {

    var routineRouter = express.Router();

    routineRouter.use('/routines', function (req, res, next) {
        (0, _tokenHelper2.default)(req, res, next);
    });

    routineRouter.route('/routines').post(function (req, res, next) {
        var routineModel = req.body,
            userId = req.decoded.id;
        RoutineManager.createRoutine(routineModel, userId, next).then(function (routine) {
            res.json({
                message: 'routine created!',
                routine: routine
            });
        });
    }).get(function (req, res, next) {
        var userId = req.decoded.id;
        RoutineManager.getRoutines(userId, next).then(function (routines) {
            res.json(routines);
        });
    });

    routineRouter.route('/routines/:routine_id').get(function (req, res, next) {
        var routineId = req.params.routine_id;
        RoutineManager.getRoutine(routineId, next).then(function (routine) {
            res.json(routine);
        });
    }).put(function (req, res, next) {
        var routineId = req.params.routine_id,
            routineModel = req.body;
        RoutineManager.updateRoutine(routineId, routineModel, next).then(function () {
            res.json({
                message: 'routine updated!'
            });
        });
    }).delete(function (req, res, next) {
        var routineId = req.params.routine_id;
        DayManager.deleteAllDaysForRoutine(routineId, next).then(function () {
            SubRoutineManager.deleteAllSubRoutinesForRoutine(routineId, next);
        }).then(function () {
            RoutineManager.deleteRoutine(routineId, next);
        }).then(function () {
            res.json({
                message: 'Successfully deleted'
            });
        });
    });

    return routineRouter;
}

exports.default = RoutineRoutes;