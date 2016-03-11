import * as DayManager from '../managers/dayManager';
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
                routineId = req.params.routine_Id,
                userId = req.decoded.id;
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
            const
                dayId = req.params.day_id,
                dayModel = req.body;
            DayManager.updateDay(dayId, dayModel, next)
                .then(() => {
                    res.json({
                        message: "day updated!"
                    });
                });
        })
        .delete((req, res, next) => {
            const dayId = req.params.day_id;
            DayManager.deleteDay(dayId, next)
                .then(() => {
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
            const
                subRoutineId = req.params.subRoutine_id,
                userId = req.decoded.id;
            DayManager.getDaysForSubRoutine(subRoutineId, userId, next)
                .then((days) => {
                    res.json(days);
                });
        });

    return dayRouter;
}

export default DayRoutes;
