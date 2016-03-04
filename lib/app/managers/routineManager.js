import Routine from '../models/routine';
import moment from 'moment';

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
    deleteRoutine,
    deleteAllRoutines,
}
