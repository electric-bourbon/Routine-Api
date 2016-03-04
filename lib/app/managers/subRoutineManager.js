import SubRoutine from '../models/subRoutine';
import moment from 'moment';

function deleteAllSubRoutines(userId, next) {
    SubRoutine.remove({ userId }, (err, routine) => {
        if (err) {
            console.log(`Error deleting routine: ${err}`);
            next(err);
        }
    });
}

function createSubRoutine() {

}

function deleteSubRoutine() {

}

function getSubRoutine() {

}

function getSubRoutines() {

}

function updateSubRoutine() {

}
export {
    createSubRoutine,
    deleteSubRoutine,
    deleteAllSubRoutines,
    getSubRoutine,
    getSubRoutines,
    updateSubRoutine,
}
