import Day from '../models/day';
import moment from 'moment';

function createDayForSubRoutine(routineId, subRoutineId, dayModel, userId, next) {
    let day = new Day();
    day.date = dayModel.date;
    day.value = dayModel.value;
    day.routineId = routineId;
    day.subRoutineId = subRoutineId;
    day.createdDate = moment().valueOf();
    day.modifiedDate = moment().valueOf();
    day.userId = userId;

    console.log(`Creating new day: ${day}`);

    return day.save((err) => {
            if (err) {
                console.log(`Error creating day : ${err}`);
                return next(err);
            }
            console.log("day Created");
            return day;
        });
}

function createDayForRoutine(routineId, dayModel, userId, next) {
    let day = new Day();
    day.date = dayModel.date;
    day.value = dayModel.value;
    day.routineId = routineId;
    day.createdDate = moment().valueOf();
    day.modifiedDate = moment().valueOf();
    day.userId = userId;

    console.log(`Creating new day: ${day}`);

    return day.save((err) => {
        if (err) {
            console.log(`Error creating day : ${err}`);
            return next(err);
        }
        console.log("day Created");
    });
}

function deleteDay(dayId, next) {
    return Day.remove({
        _id: dayId
    }, (err, day) => {

        if (!day) {
            var notFound = new Error("day not found");
            notFound.status = 404;
            return next(notFound);
        }

        if (err) {
            console.log(`Error deleting day: ${err}`);
            next(err);
        }
        console.log("day deleted");
    });
}

function getDay(dayId, next) {
    return promises.getDay(dayId, (err, day) => {
            if (!day) {
                var notFound = new Error("day not found");
                notFound.status = 404;
                return next(notFound);
            }

            if (err) {
                console.log(`Error getting day: ${err}`);
                next(err);
            }
            console.log(`Retrieving day: ${day}`);
            return day;
    });
}

function getDaysForRoutine(routineId, userId, next) {
    return promises.getDaysForRoutine(routineId, userId, (err, days) => {
        if (err) {
            console.log(`Error getting days: ${err}`);
        }
        return days;
    });
}

function getDaysForSubRoutine(subRoutineId, userId, next) {
    return promises.getDaysForSubRoutine(subRoutineId, userId, (err, days) => {
        if (err) {
            console.log(`Error getting days: ${err}`);
        }
        return days;
    });
}

function deleteAllDaysForUser(userId, next) {
    return Day.remove({ userId }, (err, day) => {
        if (err) {
            console.log(`Error deleting days for user: ${err}`);
            next(err);
        }
    });
}

function deleteAllDaysForSubRoutine(subRoutineId, next) {
    return Day.remove({ subRoutineId }, (err, day) => {
        if (err) {
            console.log(`Error deleting days for subroutine: ${err}`);
            next(err);
        }
        console.log(`All days deleted for SubRoutine: ${subRoutineId}`);
    });
}

function deleteAllDaysForRoutine(routineId, next) {
    return Day.remove({ routineId }, (err, day) => {
        if (err) {
            console.log(`Error deleting days for routine: ${err}`);
            next(err);
        }
        console.log(`All days deleted for routine: ${routineId}`);
    });
}

function updateDay(dayId, dayModel, next) {
    return promises.getDay(dayId, (err, day) => {
        if (err) {
            console.log(`Error updating days: ${err}`);
            next(err);
        }
        if (!day) {
            let notFound = new Error("day not found");
            notFound.status = 404;
            return next(notFound);
        }

        if (dayModel.value) day.value = dayModel.value;
        if (dayModel.date) day.date = dayModel.date;
        day.modifiedDate = moment().valueOf();
        day.save((err) => {
            if (err) {
                next(err);
            }
            console.log(`Updating day: ${day}`);
        });

    });
}

const promises = {
    getDaysForRoutine(routineId, userId, callback) {
        return Day.find({
            userId,
            routineId
        }, (err, days) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, days);
            }
        });
    },
    getDaysForSubRoutine(subRoutineId, userId, callback) {
        return Day.find({
            userId,
            subRoutineId
        }, (err, days) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, days);
            }
        });
    },
    getDay(dayId, callback) {
        return Day.findById(dayId, (err, day) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, day);
            }
        });
    },
}

export {
    createDayForRoutine,
    createDayForSubRoutine,
    getDaysForSubRoutine,
    getDaysForRoutine,
    getDay,
    deleteDay,
    deleteAllDaysForUser,
    deleteAllDaysForSubRoutine,
    deleteAllDaysForRoutine,
    updateDay,
}
