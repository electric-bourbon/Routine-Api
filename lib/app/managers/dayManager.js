import Day from '../models/day';
import moment from 'moment';

function createDayForSubRoutine() {

}

function createDayForRoutine() {

}

function deleteDay() {

}

function getDay() {

}

function getDaysForRoutine() {

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

export {
    createDayForRoutine,
    createDayForSubRoutine,
    getDaysForSubRoutine,
    getDaysForRoutine,
    getDay,
    deleteDay,
    deleteAllDays,
}
