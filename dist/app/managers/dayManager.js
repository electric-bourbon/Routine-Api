'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateDay = exports.deleteAllDaysForRoutine = exports.deleteAllDaysForSubRoutine = exports.deleteAllDaysForUser = exports.deleteDay = exports.getDay = exports.getDaysForRoutine = exports.getDaysForSubRoutine = exports.createDayForSubRoutine = exports.createDayForRoutine = undefined;

var _day = require('../models/day');

var _day2 = _interopRequireDefault(_day);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDayForSubRoutine(routineId, subRoutineId, dayModel, userId, next) {
    var day = new _day2.default();
    day.date = dayModel.date;
    day.value = dayModel.value;
    day.routineId = routineId;
    day.subRoutineId = subRoutineId;
    day.createdDate = (0, _moment2.default)().valueOf();
    day.modifiedDate = (0, _moment2.default)().valueOf();
    day.userId = userId;

    console.log('Creating new day: ' + day);

    return day.save(function (err) {
        if (err) {
            console.log('Error creating day : ' + err);
            return next(err);
        }
        console.log("day Created");
        return day;
    });
}

function createDayForRoutine(routineId, dayModel, userId, next) {
    var day = new _day2.default();
    day.date = dayModel.date;
    day.value = dayModel.value;
    day.routineId = routineId;
    day.createdDate = (0, _moment2.default)().valueOf();
    day.modifiedDate = (0, _moment2.default)().valueOf();
    day.userId = userId;

    console.log('Creating new day: ' + day);

    return day.save(function (err) {
        if (err) {
            console.log('Error creating day : ' + err);
            return next(err);
        }
        console.log("day Created");
    });
}

function deleteDay(dayId, next) {
    return _day2.default.remove({
        _id: dayId
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
    });
}

function getDay(dayId, next) {
    return promises.getDay(dayId, function (err, day) {
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
        return day;
    });
}

function getDaysForRoutine(routineId, userId, next) {
    return promises.getDaysForRoutine(routineId, userId, function (err, days) {
        if (err) {
            console.log('Error getting days: ' + err);
        }
        return days;
    });
}

function getDaysForSubRoutine(subRoutineId, userId, next) {
    return promises.getDaysForSubRoutine(subRoutineId, userId, function (err, days) {
        if (err) {
            console.log('Error getting days: ' + err);
        }
        return days;
    });
}

function deleteAllDaysForUser(userId, next) {
    return _day2.default.remove({ userId: userId }, function (err, day) {
        if (err) {
            console.log('Error deleting days for user: ' + err);
            next(err);
        }
    });
}

function deleteAllDaysForSubRoutine(subRoutineId, next) {
    return _day2.default.remove({ subRoutineId: subRoutineId }, function (err, day) {
        if (err) {
            console.log('Error deleting days for subroutine: ' + err);
            next(err);
        }
        console.log('All days deleted for SubRoutine: ' + subRoutineId);
    });
}

function deleteAllDaysForRoutine(routineId, next) {
    return _day2.default.remove({ routineId: routineId }, function (err, day) {
        if (err) {
            console.log('Error deleting days for routine: ' + err);
            next(err);
        }
        console.log('All days deleted for routine: ' + routineId);
    });
}

function updateDay(dayId, dayModel, next) {
    return promises.getDay(dayId, function (err, day) {
        if (err) {
            console.log('Error updating days: ' + err);
            next(err);
        }
        if (!day) {
            var notFound = new Error("day not found");
            notFound.status = 404;
            return next(notFound);
        }

        if (dayModel.value) day.value = dayModel.value;
        if (dayModel.date) day.date = dayModel.date;
        day.modifiedDate = (0, _moment2.default)().valueOf();
        day.save(function (err) {
            if (err) {
                next(err);
            }
            console.log('Updating day: ' + day);
        });
    });
}

var promises = {
    getDaysForRoutine: function getDaysForRoutine(routineId, userId, callback) {
        return _day2.default.find({
            userId: userId,
            routineId: routineId
        }, function (err, days) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, days);
            }
        });
    },
    getDaysForSubRoutine: function getDaysForSubRoutine(subRoutineId, userId, callback) {
        return _day2.default.find({
            userId: userId,
            subRoutineId: subRoutineId
        }, function (err, days) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, days);
            }
        });
    },
    getDay: function getDay(dayId, callback) {
        return _day2.default.findById(dayId, function (err, day) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, day);
            }
        });
    }
};

exports.createDayForRoutine = createDayForRoutine;
exports.createDayForSubRoutine = createDayForSubRoutine;
exports.getDaysForSubRoutine = getDaysForSubRoutine;
exports.getDaysForRoutine = getDaysForRoutine;
exports.getDay = getDay;
exports.deleteDay = deleteDay;
exports.deleteAllDaysForUser = deleteAllDaysForUser;
exports.deleteAllDaysForSubRoutine = deleteAllDaysForSubRoutine;
exports.deleteAllDaysForRoutine = deleteAllDaysForRoutine;
exports.updateDay = updateDay;