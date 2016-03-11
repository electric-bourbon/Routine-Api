'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateRoutine = exports.getRoutine = exports.getRoutines = exports.deleteAllRoutinesForUser = exports.deleteRoutine = exports.createRoutine = undefined;

var _routine = require('../models/routine');

var _routine2 = _interopRequireDefault(_routine);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRoutine(routineModel, userId, next) {
    var routine = new _routine2.default();
    routine.name = routineModel.name;
    routine.style = routineModel.style;
    routine.desiredFrequency = routine.style === '4-day' ? 4 : routineModel.desiredFrequency;
    routine.startDate = routineModel.startDate;
    routine.createdDate = (0, _moment2.default)().valueOf();
    routine.modifiedDate = (0, _moment2.default)().valueOf();
    routine.userId = userId;

    console.log('Creating new routine: ' + routine);

    return routine.save(function (err) {
        if (err) {
            console.log('Error creating routine : ' + err);
            return next(err);
        }
        console.log("routine Created");
        return routine;
    });
}

function getRoutines(userId, next) {
    return promises.getRoutines(userId, function (err, routines) {
        if (err) {
            console.log('Error getting routines: ' + err);
            return next(err);
        }
        return routines;
    });
}

function getRoutine(routineId, next) {
    return promises.getRoutine(routineId, function (err, routine) {
        if (err) {
            console.log('Error getting routines: ' + err);
            return next(err);
        }
        if (!routine) {
            var notFound = new Error("routine not found");
            notFound.status = 404;
            return next(notFound);
        }
        return routine;
    });
}

function updateRoutine(routineId, routineModel, next) {
    return promises.getRoutine(routineId, function (err, routine) {
        if (err) {
            console.log('Error getting routines: ' + err);
            return next(err);
        }
        if (!routine) {
            var notFound = new Error("routine not found");
            notFound.status = 404;
            return next(notFound);
        }
        if (routineModel.name) routine.name = routineModel.name;
        if (routineModel.style) routine.style = routineModel.style;
        if (routineModel.startDate) routine.startDate = routineModel.startDate;
        if (routineModel.desiredFrequency) routine.desiredFrequency = routineModel.desiredFrequency;
        routine.modifiedDate = (0, _moment2.default)().valueOf();

        routine.save(function (err) {
            if (err) {
                next(err);
            }
            console.log('Updating routine: ' + routine);
        });
    });
}

function deleteRoutine(routineId, next) {
    return _routine2.default.remove({
        _id: routineId
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

        console.log("Routine Deleted");
    });
}

function deleteAllRoutinesForUser(userId, next) {
    return _routine2.default.remove({
        userId: userId
    }, function (err, routine) {
        if (err) {
            console.log('Error deleting routine: ' + err);
            next(err);
        }
        console.log('Deleted all routines for user: ' + userId);
    });
}

var promises = {
    getRoutines: function getRoutines(userId, callback) {
        return _routine2.default.find({
            userId: userId
        }, function (err, routines) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, routines);
            }
        });
    },
    getRoutine: function getRoutine(routineId, callback) {
        return _routine2.default.findById(routineId, function (err, routine) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, routine);
            }
        });
    }
};
exports.createRoutine = createRoutine;
exports.deleteRoutine = deleteRoutine;
exports.deleteAllRoutinesForUser = deleteAllRoutinesForUser;
exports.getRoutines = getRoutines;
exports.getRoutine = getRoutine;
exports.updateRoutine = updateRoutine;