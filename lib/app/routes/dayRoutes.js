import Day from '../models/day';
import verifyToken from '../helpers/tokenHelper';
import moment from 'moment';


function DayRoutes(app, express) {

    let dayRouter = express.Router();

    dayRouter.use('/routines/:routine_id/days', (req, res, next) => {
        verifyToken(req, res, next);
    });
    dayRouter.route('/routines/:routine_id/days')
        .post((req, res, next) => {

            let day = new Day();
            day.date = req.body.date;
            day.value = req.body.value;
            day.routineId = req.params.routine_id;
            day.createdDate = moment().valueOf();
            day.modifiedDate = moment().valueOf();
            day.userId = req.decoded.id;

            console.log(`Creating new day: ${day}`);

            day.save((err) => {
                if (err) {
                    console.log(`Error creating day : ${err}`);
                    return next(err);
                }
                console.log("day Created");
                res.json({
                    message: 'day created!',
                    day
                });
            });

        })
        .get((req, res, next) => {
            Day.find({
                userId: req.decoded.id,
                routineId: req.params.routine_id
            }, (err, days) => {
                if (err) {
                    console.log(`Error getting days: ${err}`);
                    return next(err);
                }
                // return the days
                res.json(days);
            });
        });


    dayRouter.route('/days/:day_id')
        .get((req, res, next) => {
            Day.findById(req.params.day_id, (err, day) => {
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
                // return that day
                res.json(day);
            });
        })

    // update the day with this id
    .put((req, res, next) => {
            Day.findById(req.params.day_id, (err, day) => {

                if (err) {
                    console.log(`Error updating day: ${err}`);
                    next(err);
                }

                if (req.body.value) day.value = req.body.value;
                if (req.body.date) day.date = req.body.date;
                day.modifiedDate = moment().valueOf();
                day.save((err) => {
                    if (err) {
                        next(err);
                    }
                    console.log(`Updating day: ${day}`);
                    res.json({
                        message: 'day updated!',
                        day
                    });
                });

            });
        })
        .delete((req, res, next) => {
            Day.remove({
                _id: req.params.day_id
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
                res.json({
                    message: 'Successfully deleted'
                });
            });
        });

    dayRouter.route('/routines/:routine_id/subRoutines/:subRoutine_id/days')
        .post((req, res, next) => {

            let day = new Day();
            day.date = req.body.date;
            day.value = req.body.value;
            day.routineId = req.params.routine_id;
            day.subRoutineId = req.params.subRoutine_id;
            day.createdDate = moment().valueOf();
            day.modifiedDate = moment().valueOf();
            day.userId = req.decoded.id;

            console.log(`Creating new day: ${day}`);

            day.save((err) => {
                if (err) {
                    console.log(`Error creating day : ${err}`);
                    return next(err);
                }
                console.log("day Created");
                res.json({
                    message: 'day created!',
                    day
                });
            });

        })
        .get((req, res, next) => {
            Day.find({
                userId: req.decoded.id,
                routineId: req.params.routine_id,
                subRoutineId: req.params.subRoutine_id
            })
        }, (err, days) => {
            if (err) {
                console.log(`Error getting days: ${err}`);
                return next(err);
            }
            // return the days
            res.json(days);
        });

    return dayRouter;
}

export default DayRoutes;
