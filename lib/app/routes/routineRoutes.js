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
                userId = req.decoded.id;
            RoutineManager.createRoutine(routineModel, userId, next)
                .then((routine) => {
                    res.json({
                        message: 'routine created!',
                        routine
                    });
                });
        })
        .get((req, res, next) => {
            const userId = req.decoded.id;
            RoutineManager.getRoutines(userId, next)
                .then((routines) => {
                    res.json(routines);
                });
        });

    routineRouter.route('/routines/:routine_id')
        .get((req, res, next) => {
            const routineId = req.params.routine_id;
            RoutineManager.getRoutine(routineId, next)
                .then((routine) => {
                    res.json(routine);
                });
        })
        .put((req, res, next) => {
            const
                routineId = req.params.routine_id,
                routineModel = req.body;
            RoutineManager.updateRoutine(routineId, routineModel, next)
                .then(() => {
                    res.json({
                        message: 'routine updated!'
                    });
                });
        })
        .delete((req, res, next) => {
            const routineId = req.params.routine_id;
            RoutineManager.deleteRoutine(routineId, next)
                .then(() =>{
                    res.json({
                        message: 'Successfully deleted'
                    });
                });

        });

    return routineRouter;
}

export default RoutineRoutes;
