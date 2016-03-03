'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routine = require('../models/routine');

var _routine2 = _interopRequireDefault(_routine);

var _tokenHelper = require('../helpers/tokenHelper');

var _tokenHelper2 = _interopRequireDefault(_tokenHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RoutineRoutes(app, express) {

  var routineRouter = express.Router();

  routineRouter.use('/routines', function (req, res, next) {
    (0, _tokenHelper2.default)(req, res, next);
  });
  routineRouter.route('/routines').post(function (req, res, next) {

    var routine = new _routine2.default();
    routine.routineName = req.body.routinename;
    routine.routineStyle = req.body.routineStyle;
    routine.status = req.body.status;
    routine.completed = req.body.completed;
    routine.startDate = req.body.startDate;
    routine.endDate = req.body.endDate;
    routine.createdDate = req.body.createdDate;
    routine.modifiedDate = req.body.modifiedDate;
    routine.userId = req.decoded.id;

    console.log('Creating new routine: ' + routine);

    routine.save(function (err) {
      if (err) {
        console.log('Error creating routine : ' + err);
        return next(err);
      }
      console.log("routine Created");
      res.json({ message: 'routine created!' });
    });
  }).get(function (req, res, next) {

    _routine2.default.find({ userId: req.decoded.id }, function (err, routines) {
      if (err) {
        console.log('Error getting routines: ' + err);
        return next(err);
      }
      // return the routines
      res.json(routines);
    });
  });

  routineRouter.route('/routines/:routine_id').get(function (req, res, next) {
    _routine2.default.findById(req.params.routine_id, function (err, routine) {
      if (!routine) {
        var notFound = new Error("routine not found");
        notFound.status = 404;
        return next(notFound);
      }

      if (err) {
        console.log('Error deleting routine: ' + err);
        next(err);
      }
      console.log('Retrieving routine: ' + routine);
      // return that routine
      res.json(routine);
    });
  })

  // update the routine with this id
  .put(function (req, res, next) {
    _routine2.default.findById(req.params.routine_id, function (err, routine) {

      if (err) {
        console.log('Error updating routine: ' + err);
        next(err);
      }

      // set the new routine information if it exists in the request
      if (req.body.name) routine.name = req.body.name;
      if (req.body.routinename) routine.routinename = req.body.routinename;
      if (req.body.password) routine.password = req.body.password;
      if (req.body.email) routine.email = req.body.email;
      // save the routine
      routine.save(function (err) {
        if (err) {
          next(err);
        }
        console.log('Updating routine: ' + routine);
        res.json({ message: 'routine updated!' });
      });
    });
  }).delete(function (req, res, next) {
    _routine2.default.remove({
      _id: req.params.routine_id
    }, function (err, routine) {

      if (!routine) {
        var notFound = new Error("routine not found");
        notFound.status = 404;
        return next(notFound);
      }

      if (err) {
        console.log('Error deleting routine: ' + err);
        next(err);
      }
      console.log("routine deleted");
      res.json({ message: 'Successfully deleted' });
    });
  });

  return routineRouter;
}

exports.default = RoutineRoutes;