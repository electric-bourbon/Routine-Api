'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateSubRoutine = exports.getSubRoutines = exports.getSubRoutine = exports.deleteAllSubRoutinesForRoutine = exports.deleteAllSubRoutinesForUser = exports.deleteSubRoutine = exports.createSubRoutine = undefined;

var _subRoutine = require('../models/subRoutine');

var _subRoutine2 = _interopRequireDefault(_subRoutine);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deleteAllSubRoutinesForUser(userId, next) {
    return _subRoutine2.default.remove({ userId: userId }, function (err, routine) {
        if (err) {
            console.log('Error deleting routines: ' + err);
            next(err);
        }
    });
}

function deleteAllSubRoutinesForRoutine(routineId, next) {
    return _subRoutine2.default.remove({ routineId: routineId }, function (err, routine) {
        if (err) {
            console.log('Error deleting routines: ' + err);
            next(err);
        }
    });
}

function createSubRoutine(subRoutineModel, routineId, userId, next) {
    var subRoutine = new _subRoutine2.default();
    subRoutine.name = subRoutineModel.name;
    subRoutine.style = subRoutineModel.style;
    subRoutine.desiredFrequency = subRoutine.style === '4-day' ? 4 : subRoutineModel.desiredFrequency;
    subRoutine.routineId = routineId;
    subRoutine.createdDate = (0, _moment2.default)().valueOf();
    subRoutine.modifiedDate = (0, _moment2.default)().valueOf();
    subRoutine.userId = userId;

    console.log('Creating new subRoutine: ' + subRoutine);

    return subRoutine.save(function (err) {
        if (err) {
            console.log('Error creating subRoutine : ' + err);
            return next(err);
        }
        console.log("subRoutine Created");
        return subRoutine;
    });
}

function deleteSubRoutine(subRoutineId, next) {
    return _subRoutine2.default.remove({
        _id: subRoutineId
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
    });
}

function getSubRoutine(subRoutineId, next) {
    return promises.getSubRoutine(subRoutineId, function (err, subRoutine) {
        if (err) {
            console.log('Error getting subRoutine: ' + err);
            return next(err);
        }
        if (!subRoutine) {
            var notFound = new Error("subRoutine not found");
            notFound.status = 404;
            return next(notFound);
        }
        return subRoutine;
    });
}

function getSubRoutines(routineId, userId, callback) {
    return promises.getSubRoutines(routineId, userId, function (err, subRoutines) {
        if (err) {
            console.log('Error getting subRoutines: ' + err);
            return next(err);
        }
        return subRoutines;
    });
}

function updateSubRoutine(subRoutineId, subRoutineModel, next) {
    return promises.getSubRoutine(subRoutineId, function (err, subRoutine) {

        if (err) {
            console.log('Error updating subRoutine: ' + err);
            next(err);
        }
        if (!subRoutine) {
            var notFound = new Error("subRoutine not found");
            notFound.status = 404;
            return next(notFound);
        }

        if (subRoutineModel.name) subRoutine.name = subRoutineModel.name;
        if (subRoutineModel.startDate) subRoutine.startDate = subRoutineModel.startDate;
        if (subRoutineModel.style) subRoutine.style = subRoutineModel.style;
        if (subRoutineModel.desiredFrequency) subRoutine.desiredFrequency = subRoutineModel.desiredFrequency;
        subRoutine.modifiedDate = (0, _moment2.default)().valueOf();

        subRoutine.save(function (err) {
            if (err) {
                next(err);
            }
            console.log('Updating subRoutine: ' + subRoutine);
        });
    });
}

var promises = {
    getSubRoutines: function getSubRoutines(routineId, userId, callback) {
        return _subRoutine2.default.find({
            userId: userId,
            routineId: routineId
        }, function (err, subRoutines) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, subRoutines);
            }
        });
    },
    getSubRoutine: function getSubRoutine(subRoutineId, callback) {
        return _subRoutine2.default.findById(subRoutineId, function (err, subRoutine) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, subRoutine);
            }
        });
    }
};

exports.createSubRoutine = createSubRoutine;
exports.deleteSubRoutine = deleteSubRoutine;
exports.deleteAllSubRoutinesForUser = deleteAllSubRoutinesForUser;
exports.deleteAllSubRoutinesForRoutine = deleteAllSubRoutinesForRoutine;
exports.getSubRoutine = getSubRoutine;
exports.getSubRoutines = getSubRoutines;
exports.updateSubRoutine = updateSubRoutine;