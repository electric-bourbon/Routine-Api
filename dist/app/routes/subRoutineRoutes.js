'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _subRoutineManager = require('../managers/subRoutineManager');

var SubRoutineManager = _interopRequireWildcard(_subRoutineManager);

var _tokenHelper = require('../helpers/tokenHelper');

var _tokenHelper2 = _interopRequireDefault(_tokenHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function SubRoutineRoutes(app, express) {

    var subRoutineRouter = express.Router();

    subRoutineRouter.use('/routines/:routine_id/subRoutines', function (req, res, next) {
        (0, _tokenHelper2.default)(req, res, next);
    });
    subRoutineRouter.route('/routines/:routine_id/subRoutines').post(function (req, res, next) {
        var subRoutineModel = req.body,
            userId = req.decoded.id,
            routineId = req.params.routine_id;
        SubRoutineManager.createSubRoutine(subRoutineModel, routineId, userId, next).then(function (subRoutine) {
            res.json({
                message: 'subRoutine created!',
                subRoutine: subRoutine
            });
        });
    }).get(function (req, res, next) {
        var userId = req.decoded.id,
            routineId = req.params.routine_id;
        SubRoutineManager.getSubRoutines(routineId, userId, next).then(function (subRoutines) {
            res.json(subRoutines);
        });
    });

    subRoutineRouter.route('/routines/:routine_id/subRoutines/:subRoutine_id').get(function (req, res, next) {
        var subRoutineId = req.params.subRoutine_id;
        SubRoutineManager.getSubRoutine(subRoutineId, next).then(function (subRoutine) {
            res.json(subRoutine);
        });
    }).put(function (req, res, next) {
        var subRoutineModel = req.body,
            subRoutineId = req.params.subRoutine_id;
        SubRoutineManager.updateSubRoutine(subRoutineId, subRoutineModel, next).then(function () {
            res.json({
                message: 'subRoutine updated!'
            });
        });
    }).delete(function (req, res, next) {
        var subRoutineId = req.params.subRoutine_id;
        SubRoutineManager.deleteSubRoutine(subRoutineId, next).then(function () {
            res.json({
                message: 'Successfully deleted'
            });
        });
    });

    return subRoutineRouter;
}

exports.default = SubRoutineRoutes;