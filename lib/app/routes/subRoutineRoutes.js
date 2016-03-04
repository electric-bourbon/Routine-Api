import SubRoutine from '../models/subRoutine';
import verifyToken from '../helpers/tokenHelper';
import moment from 'moment';


function SubRoutineRoutes(app, express) {

    let subRoutineRouter = express.Router();

    subRoutineRouter.use('/routines/:routine_id/subRoutines', (req, res, next) => {
        verifyToken(req, res, next);
    });
    subRoutineRouter.route('/routines/:routine_id/subRoutines')
        .post((req, res, next) => {

            let subRoutine = new SubRoutine();
            subRoutine.name = req.body.name;
            subRoutine.style = req.body.style;
            subRoutine.desiredFrequency = subRoutine.style === '4-day' ? 4 : req.body.desiredFrequency;
            subRoutine.routineId = req.params.routine_id;
            subRoutine.createdDate = moment().valueOf();
            subRoutine.modifiedDate = moment().valueOf();
            subRoutine.userId = req.decoded.id;

            console.log(`Creating new subRoutine: ${subRoutine}`);

            subRoutine.save((err) => {
                if (err) {
                    console.log(`Error creating subRoutine : ${err}`);
                    return next(err);
                }
                console.log("subRoutine Created");
                res.json({
                    message: 'subRoutine created!',
                    subRoutine
                });
            });

        })
        .get((req, res, next) => {

            SubRoutine.find({
                userId: req.decoded.id,
                routineId: req.params.routine_id
            }, (err, subRoutines) => {
                if (err) {
                    console.log(`Error getting subRoutines: ${err}`);
                    return next(err);
                }
                // return the subRoutines
                res.json(subRoutines);
            });
        });

    subRoutineRouter.route('/routines/:routine_id/subRoutines/:subRoutine_id')
        .get((req, res, next) => {
            SubRoutine.findById(req.params.subRoutine_id, (err, subRoutine) => {
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
                // return that subRoutine
                res.json(subRoutine);
            });
        })

    // update the subRoutine with this id
    .put((req, res, next) => {
            SubRoutine.findById(req.params.subRoutine_id, (err, subRoutine) => {

                if (err) {
                    console.log(`Error updating subRoutine: ${err}`);
                    next(err);
                }

                if (req.body.name) subRoutine.name = req.body.name;
                if (req.body.startDate) subRoutine.startDate = req.body.startDate;
                if (req.body.style) subRoutine.style = req.body.style;
                if (req.body.desiredFrequency) subRoutine.desiredFrequency = req.body.desiredFrequency;
                subRoutine.modifiedDate = req.body.modifiedDate;

                subRoutine.save((err) => {
                    if (err) {
                        next(err);
                    }
                    console.log(`Updating subRoutine: ${subRoutine}`);
                    res.json({
                        message: 'subRoutine updated!'
                    });
                });

            });
        })
        .delete((req, res, next) => {
            SubRoutine.remove({
                _id: req.params.subRoutine_id
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
                res.json({
                    message: 'Successfully deleted'
                });
            });
        });

    return subRoutineRouter;
}

export default SubRoutineRoutes;
