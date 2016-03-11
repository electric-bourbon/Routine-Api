import * as SubRoutineManager from '../managers/subRoutineManager';
import * as DayManager from '../managers/dayManager';
import verifyToken from '../helpers/tokenHelper';

function SubRoutineRoutes(app, express) {

    let subRoutineRouter = express.Router();

    subRoutineRouter.use('/routines/:routine_id/subRoutines', (req, res, next) => {
        verifyToken(req, res, next);
    });
    subRoutineRouter.route('/routines/:routine_id/subRoutines')
        .post((req, res, next) => {
            const
                subRoutineModel = req.body,
                userId = req.decoded.id,
                routineId = req.params.routine_id;
            SubRoutineManager.createSubRoutine(subRoutineModel, routineId, userId, next)
                .then((subRoutine) => {
                    res.json({
                        message: 'subRoutine created!',
                        subRoutine
                    });
                });
        })
        .get((req, res, next) => {
            const
                userId = req.decoded.id,
                routineId = req.params.routine_id;
            SubRoutineManager.getSubRoutines(routineId, userId, next)
                .then((subRoutines) => {
                    res.json(subRoutines);
                });
        });

    subRoutineRouter.route('/routines/:routine_id/subRoutines/:subRoutine_id')
        .get((req, res, next) => {
            const subRoutineId = req.params.subRoutine_id;
            SubRoutineManager.getSubRoutine(subRoutineId, next)
                .then((subRoutine) => {
                    res.json(subRoutine);
                });
        })
        .put((req, res, next) => {
            const
                subRoutineModel = req.body,
                subRoutineId = req.params.subRoutine_id;
            SubRoutineManager.updateSubRoutine(subRoutineId, subRoutineModel, next)
                .then(() => {
                    res.json({
                        message: 'subRoutine updated!'
                    });
                });

        })
        .delete((req, res, next) => {
            const subRoutineId = req.params.subRoutine_id;
            DayManager.deleteAllDaysForSubRoutine(subRoutineId, next)
                .then(() => {
                    SubRoutineManager.deleteSubRoutine(subRoutineId, next)
                })
                .then(() => {
                    res.json({
                        message: 'Successfully deleted'
                });
            })


        });

    return subRoutineRouter;
}

export default SubRoutineRoutes;
