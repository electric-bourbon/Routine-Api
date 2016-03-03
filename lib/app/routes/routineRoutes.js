import Routine from '../models/routine';
import verifyToken from '../helpers/tokenHelper';
import moment from 'moment';


function RoutineRoutes(app, express) {

    let routineRouter = express.Router();

    routineRouter.use('/routines', (req, res, next) => {
        verifyToken(req, res, next);
    });
    routineRouter.route('/routines')
        .post((req, res, next) => {

            let routine = new Routine();
            routine.name = req.body.name;
            routine.style = req.body.style;
            routine.desiredFrequency = req.body.desiredFrequency;
            routine.startDate = req.body.startDate;
            routine.createdDate = moment().valueOf();
            routine.modifiedDate = moment().valueOf();
            routine.userId = req.decoded.id;

            console.log(`Creating new routine: ${routine}`);

            routine.save((err) => {
                if (err) {
                    console.log(`Error creating routine : ${err}`);
                    return next(err);
                }
                console.log("routine Created");
                res.json({
                    message: 'routine created!'
                });
            });

        })
        .get((req, res, next) => {

            Routine.find({
                userId: req.decoded.id
            }, (err, routines) => {
                if (err) {
                    console.log(`Error getting routines: ${err}`);
                    return next(err);
                }
                // return the routines
                res.json(routines);
            });
        });

    routineRouter.route('/routines/:routine_id')
        .get((req, res, next) => {
            Routine.findById(req.params.routine_id, (err, routine) => {
                if (!routine) {
                    var notFound = new Error("routine not found");
                    notFound.status = 404;
                    return next(notFound);
                }

                if (err) {
                    console.log(`Error deleting routine: ${err}`);
                    next(err);
                }
                console.log(`Retrieving routine: ${routine}`);
                // return that routine
                res.json(routine);
            });
        })

    // update the routine with this id
    .put((req, res, next) => {
            Routine.findById(req.params.routine_id, (err, routine) => {

                if (err) {
                    console.log(`Error updating routine: ${err}`);
                    next(err);
                }

                if (req.body.name) routine.name = req.body.name;
                if (req.body.style) routine.style = req.body.style;
                if (req.body.startDate) routine.startDate = req.body.startDate;
                if (req.body.desiredFrequency) routine.desiredFrequency = req.body.desiredFrequency;
                if (req.body.modifiedDate) routine.modifiedDate = req.body.modifiedDate;

                routine.save((err) => {
                    if (err) {
                        next(err);
                    }
                    console.log(`Updating routine: ${routine}`);
                    res.json({
                        message: 'routine updated!'
                    });
                });

            });
        })
        .delete((req, res, next) => {
            Routine.remove({
                _id: req.params.routine_id
            }, function(err, routine) {

                if (!routine) {
                    var notFound = new Error("routine not found");
                    notFound.status = 404;
                    return next(notFound);
                }

                if (err) {
                    console.log(`Error deleting routine: ${err}`);
                    next(err);
                }
                console.log("routine deleted");
                res.json({
                    message: 'Successfully deleted'
                });
            });
        });

    return routineRouter;
}

export default RoutineRoutes;
