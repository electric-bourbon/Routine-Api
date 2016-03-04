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

    subRoutine.save((err) => {
        if (err) {
            console.log(`Error creating subRoutine : ${err}`);
            return next(err);
        }
        console.log("subRoutine Created");
        return subRoutine;
    });
}

function deleteSubRoutine(subRoutineId, next) {
    SubRoutine.remove({
        _id: subRoutineId
    }, (err, subRoutine) => {

        if (!subRoutine) {
            var notFound = new Error("subRoutine not found");
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
    SubRoutine.findById(subRoutineId, (err, subRoutine) => {
        if (!subRoutine) {
            var notFound = new Error("subRoutine not found");
            notFound.status = 404;
            return next(notFound);
        }

        if (err) {
            console.log(`Error getting subRoutine: ${err}`);
            next(err);
        }

        console.log(`Retrieving subRoutine: ${subRoutine}`);
        return subRoutine;
    });
}

function getSubRoutines(routineId, userId, callback) {
    SubRoutine.find({ userId }, (err, routines) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, routines);
        }
    });
}

function updateSubRoutine(subRoutineId, subRoutineModel, next) {
    SubRoutine.findById(subRoutineId, (err, subRoutine) => {

        if (err) {
            console.log(`Error updating subRoutine: ${err}`);
            next(err);
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
export {
    createSubRoutine,
    deleteSubRoutine,
    deleteAllSubRoutines,
    getSubRoutine,
    getSubRoutines,
    updateSubRoutine,
}
