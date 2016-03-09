import DayManager from '../managers/dayManager';
import verifyToken from '../helpers/tokenHelper';

function DayRoutes(app, express) {

    let dayRouter = express.Router();

    dayRouter.use('/routines/:routine_id/days', (req, res, next) => {
        verifyToken(req, res, next);
    });
    dayRouter.route('/routines/:routine_id/days')
        .post((req, res, next) => {
            const
                userId = req.decoded.id,
                dayModel = req.body,
                routineId = req.params.routineId;
            DayManager.createDayForRoutine(routineId, dayModel, userId, next)
                .then((day) => {
                    res.json({
                        message: 'day created!',
                        day
                    });
                });
        })
        .get((req, res, next) => {
            const
                routineId = req.params.routineId,
                userId = req.decoded;
            DayManager.getDaysForRoutine(routineId, userId, next)
                .then((days) => {
                    res.json(days);
                });
        });


    dayRouter.route('/days/:day_id')
        .get((req, res, next) => {
            const dayId = req.params.day_id;
            DayManager.getDay(dayId, next)
                .then((day) => {
                    res.json(day);
                });
        })

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
            const
                dayModel = req.body,
                subRoutineId = req.params.subRoutine_id,
                routineId = req.params.routine_id,
                userId = req.decoded.id;
            DayManager.createDayForSubRoutine(routineId, subRoutineId, dayModel, userId, next)
                .then((day) => {
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
