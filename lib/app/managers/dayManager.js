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
    day.date = req.body.date;
    day.value = req.body.value;
    day.routineId = req.params.routine_id;
    day.createdDate = moment().valueOf();
    day.modifiedDate = moment().valueOf();
    day.userId = req.decoded.id;

    console.log(`Creating new day: ${day}`);

    return day.save((err) => {
        if (err) {
            console.log(`Error creating day : ${err}`);
            return next(err);
        }
        console.log("day Created");
    });
}

function deleteDay() {

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

function getDaysForSubRoutine() {

}

function deleteAllDays(userId, next) {
    Day.remove({ userId }, (err, day) => {
        if (err) {
            console.log(`Error deleting days: ${err}`);
            next(err);
        }
    });
}

function updateDay() {

}

const promises = {
    getDaysForRoutine(routineId, userId, callback) {
        return Day.find({
            userId
            routineId
        }, (err, days) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, subRoutines);
            }
        });
    },
    getDaysForSubRoutine(subRoutineId, userId, callback) {
        return Day.find({
            userId
            subRoutineId
        }, (err, days) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, subRoutines);
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
    deleteAllDays,
    updateDay,
}
