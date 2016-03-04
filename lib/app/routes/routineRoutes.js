import * as RoutineManager from '../managers/routineManager';
import verifyToken from '../helpers/tokenHelper';



function RoutineRoutes(app, express) {

    let routineRouter = express.Router();

    routineRouter.use('/routines', (req, res, next) => {
        verifyToken(req, res, next);
    });

    routineRouter.route('/routines')
        .post((req, res, next) => {
            const
                routineModel = req.body,
                userId = req.decoded.id,
                routine = RoutineManager.createRoutine(routineModel, userId, next);
            res.json({
                message: 'routine created!',
                routine
            });
        })
        .get((req, res, next) => {
            const userId = req.decoded.id;
            RoutineManager.getRoutines(userId, (err, routines) => {
                if (err) {
                    console.log(`Error getting routines: ${err}`)
                    return next(err);
                }
                res.json(routines);
            });
        });

    routineRouter.route('/routines/:routine_id')
        .get((req, res, next) => {
            const routineId = req.params.routine_id;
            RoutineManager.getRoutine(routineId, (err, routine) => {
                if (err) {
                    console.log(`Error getting routine: ${err}`);
                    next(err);
                }
                console.log(`Retrieving routine: ${routine}`);
                res.json(routine);
            });

        })
        .put((req, res, next) => {
            const
                routineId = req.params.routine_id,
                routineModel = req.body;
            RoutineManager.updateRoutine(routineId, routineModel, next);
            res.json({
                message: 'routine updated!'
            });
        })
        .delete((req, res, next) => {
            const routineId = req.params.routine_id;
            RoutineManager.deleteRoutine(routineId, next);
            res.json({
                message: 'Successfully deleted'
            });
        });

    return routineRouter;
}

export default RoutineRoutes;
