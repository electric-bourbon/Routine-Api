import Routine from '../models/routine';
import moment from 'moment';

function createRoutine(routineModel, userId, next) {
    let routine = new Routine();
    routine.name = routineModel.name;
    routine.style = routineModel.style;
    routine.desiredFrequency = routine.style === '4-day' ? 4 : routineModel.desiredFrequency;
    routine.startDate = routineModel.startDate;
    routine.createdDate = moment().valueOf();
    routine.modifiedDate = moment().valueOf();
    routine.userId = userId;

    console.log(`Creating new routine: ${routine}`);

    routine.save((err) => {
        if (err) {
            console.log(`Error creating routine : ${err}`);
            return next(err);
        }
        console.log("routine Created");
        return routine;
    });
}

function getRoutines(userId, callback) {
    Routine.find({ userId }, (err, routines) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, routines);
        }
    });
}

function getRoutine(routineId, callback) {
    Routine.findById(routineId, (err, routine) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, routine);
        }
    });
}

function updateRoutine(routineId, routineModel, next) {
    Routine.findById(routineId, (err, routine) => {

        if (err) {
            console.log(`Error updating routine: ${err}`);
            next(err);
        }

        if (routineModel.name) routine.name = routineModel.name;
        if (routineModel.style) routine.style = routineModel.style;
        if (routineModel.startDate) routine.startDate = routineModel.startDate;
        if (routineModel.desiredFrequency) routine.desiredFrequency = routineModel.desiredFrequency;
        routine.modifiedDate = moment().valueOf();

        routine.save((err) => {
            if (err) {
                next(err);
            }
            console.log(`Updating routine: ${routine}`);
        });
    });
}

function deleteRoutine(routineId, next) {
    Routine.remove({
        _id: routineId
    }, (err, routine) => {

        if (!routine) {
            var notFound = new Error("routine not found");
            notFound.status = 404;
            return next(notFound);
        }

        if (err) {
            console.log(`Error deleting routine: ${err}`);
            next(err);
        }

        console.log("Routine Deleted");
    });
}

function deleteAllRoutines(userId, next) {
    Routine.remove({ userId }, (err, routine) => {
        if (err) {
            console.log(`Error deleting routine: ${err}`);
            next(err);
        }
        console.log(`Deleted all routines for user: ${userId}`);
    });
}
export {
    createRoutine,
    deleteRoutine,
    deleteAllRoutines,
    getRoutines,
    getRoutine,
    updateRoutine,
}
