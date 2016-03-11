import SubRoutine from '../models/subRoutine';
import moment from 'moment';

function deleteAllSubRoutinesForUser(userId, next) {
    return SubRoutine.remove({ userId }, (err, routine) => {
        if (err) {
            console.log(`Error deleting routines: ${err}`);
            next(err);
        }
    });
}

function deleteAllSubRoutinesForRoutine(routineId, next) {
    return SubRoutine.remove({ routineId }, (err, routine) => {
        if (err) {
            console.log(`Error deleting routines: ${err}`);
            next(err);
        }
    });
}

function createSubRoutine(subRoutineModel, routineId, userId, next) {
    let subRoutine = new SubRoutine();
    subRoutine.name = subRoutineModel.name;
    subRoutine.style = subRoutineModel.style;
    subRoutine.desiredFrequency = subRoutine.style === '4-day' ? 4 : subRoutineModel.desiredFrequency;
    subRoutine.routineId = routineId;
    subRoutine.createdDate = moment().valueOf();
    subRoutine.modifiedDate = moment().valueOf();
    subRoutine.userId = userId;

    console.log(`Creating new subRoutine: ${subRoutine}`);

    return subRoutine.save((err) => {
        if (err) {
            console.log(`Error creating subRoutine : ${err}`);
            return next(err);
        }
        console.log("subRoutine Created");
        return subRoutine;
    });
}

function deleteSubRoutine(subRoutineId, next) {
    return SubRoutine.remove({
        _id: subRoutineId
    }, (err, subRoutine) => {

        if (!subRoutine) {
            let notFound = new Error("subRoutine not found");
            notFound.status = 404;
            return next(notFound);
        }

        if (err) {
            console.log(`Error deleting subRoutine: ${err}`);
            next(err);
        }
        console.log("subRoutine deleted");

    });
}

function getSubRoutine(subRoutineId, next) {
    return promises.getSubRoutine(subRoutineId, (err, subRoutine) => {
        if (err) {
            console.log(`Error getting subRoutine: ${err}`)
            return next(err);
        }
        if (!subRoutine) {
            let notFound = new Error("subRoutine not found");
            notFound.status = 404;
            return next(notFound);
        }
        return subRoutine;
    });
}

function getSubRoutines(routineId, userId, callback) {
    return promises.getSubRoutines(routineId, userId, (err, subRoutines) => {
        if (err) {
            console.log(`Error getting subRoutines: ${err}`)
            return next(err);
        }
        return subRoutines;
    });
}

function updateSubRoutine(subRoutineId, subRoutineModel, next) {
    return promises.getSubRoutine(subRoutineId, (err, subRoutine) => {

        if (err) {
            console.log(`Error updating subRoutine: ${err}`);
            next(err);
        }
        if (!subRoutine) {
            let notFound = new Error("subRoutine not found");
            notFound.status = 404;
            return next(notFound);
        }

        if (subRoutineModel.name) subRoutine.name = subRoutineModel.name;
        if (subRoutineModel.startDate) subRoutine.startDate = subRoutineModel.startDate;
        if (subRoutineModel.style) subRoutine.style = subRoutineModel.style;
        if (subRoutineModel.desiredFrequency) subRoutine.desiredFrequency = subRoutineModel.desiredFrequency;
        subRoutine.modifiedDate = moment().valueOf();

        subRoutine.save((err) => {
            if (err) {
                next(err);
            }
            console.log(`Updating subRoutine: ${subRoutine}`);

        });
    });
}

const promises = {
    getSubRoutines(routineId, userId, callback) {
        return SubRoutine.find({
            userId,
            routineId
        }, (err, subRoutines) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, subRoutines);
            }
        });
    },
    getSubRoutine(subRoutineId, callback) {
        return SubRoutine.findById(subRoutineId, (err, subRoutine) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, subRoutine);
            }
        });
    }
}

export {
    createSubRoutine,
    deleteSubRoutine,
    deleteAllSubRoutinesForUser,
    deleteAllSubRoutinesForRoutine,
    getSubRoutine,
    getSubRoutines,
    updateSubRoutine,
}
