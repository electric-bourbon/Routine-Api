import Routine from '../models/routine';
import verifyToken from '../helpers/tokenHelper';


function RoutineRoutes(app, express) {

  let routineRouter = express.Router();

  routineRouter.use('/routines', (req, res, next) => {
    verifyToken(req, res, next);
  });
  routineRouter.route('/routines')
    .post((req, res, next) => {

      let routine = new Routine();
      routine.routineName = req.body.routinename;
      routine.routineStyle = req.body.routineStyle;
      routine.status = req.body.status;
      routine.completed = req.body.completed;
      routine.startDate = req.body.startDate;
      routine.endDate = req.body.endDate;
      routine.createdDate = req.body.createdDate;
      routine.modifiedDate = req.body.modifiedDate;
      routine.userId = req.decoded.id;

      console.log(`Creating new routine: ${routine}`);

      routine.save((err) => {
        if (err) {
          console.log(`Error creating routine : ${err}`);
          return next(err);
        }
        console.log("routine Created");
        res.json({ message: 'routine created!' });
      });

    })
    .get((req, res, next) => {

      Routine.find({userId: req.decoded.id}, (err, routines) => {
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

        // set the new routine information if it exists in the request
        if (req.body.name) routine.name = req.body.name;
        if (req.body.routinename) routine.routinename = req.body.routinename;
        if (req.body.password) routine.password = req.body.password;
        if (req.body.email) routine.email = req.body.email;
        // save the routine
        routine.save((err) => {
          if (err) {
                  next(err);
          }
          console.log(`Updating routine: ${routine}`);
          res.json({ message: 'routine updated!' });
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

        if(err) {
            console.log(`Error deleting routine: ${err}`);
            next(err);
         }
        console.log("routine deleted");
        res.json({ message: 'Successfully deleted' });
      });
    });
  // route middleware to verify a token
  routineRouter.use('/me', (req, res, next) => {
    verifyToken(req, res, next);
  });
  // api endpoint to get routine information
  routineRouter.get('/me', (req, res) => {
    res.send(req.decoded);
  });

  return routineRouter;
}

export default RoutineRoutes;
