import bodyParser from 'body-parser';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../../config';
import verifyToken from '../helpers/tokenHelper';
import * as UserManager from '../managers/userManager';
import * as RoutineManager from '../managers/routineManager';
import * as SubRoutineManager from '../managers/subRoutineManager';
import * as DayManager from '../managers/dayManager';

const superSecret = config.secret;


function UserRoutes(app, express) {

    let userRouter = express.Router();

    userRouter.route('/users')
        .post((req, res, next) => {
            const
                userModel = req.body,
                user = UserManager.createUser(userModel, next);

            res.json({
                message: 'User created!',
                user,
            });

        });

    userRouter.post('/login', (req, res, next) => {

        // find the user
        User.findOne({
            email: req.body.email
        }).select('name password email _id').exec((err, user) => {

            if (err) next(err);

            // no user with that email was found
            if (!user) {
                let notFound = new Error("Could not find user");
                notFound.status = 404;
                return next(notFound);
            } else if (user) {

                // check if password matches
                const validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    let incorrectPassword = new Error("Password was incorrect.");
                    incorrectPassword.status = 403;
                    return next(incorrectPassword);
                } else {
                    // if user is found and password is right
                    // create a token
                    const token = jwt.sign({
                        name: user.name,
                        id: user._id,
                        email: user.email,
                    }, superSecret, {
                        expiresIn: 172800 // expires in 24 hours
                    });
                    console.log(`User logged in: ${user}`);
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        id: user._id
                    });
                }
            }
        });
    });

    // route middleware to verify a token
    userRouter.use('/users', (req, res, next) => {
        verifyToken(req, res, next);
    });

    // on routes that end in /users
    // ----------------------------------------------------
    userRouter.route('/users')
        .get((req, res, next) => {
            const users = UserManager.getUsers();
            res.json(users);
        });

    userRouter.route('/users/:user_id')
        .get((req, res, next) => {
            const
                userId = req.params.user_id,
                user = UserManager.getUser(userId, next);
            res.json(user);
        })
        .put((req, res, next) => {
            const
                userId = req.params.user_id,
                userModel = req.body;
            UserManager.updateUser(userId, next);
            res.json({
                message: 'User updated!'
            });
        })
        .delete((req, res, next) => {
            const userId = req.params.user_id;
            DayManager.deleteAllDays(userId, next);
            SubRoutineManager.deleteAllSubRoutines(userId, next);
            RoutineManager.deleteAllRoutines(userId, next);
            UserManager.deleteUser(userId, next);

            res.json({
                message: 'Successfully deleted'
            });
        });

    userRouter.use('/me', (req, res, next) => {
        verifyToken(req, res, next);
    });
    userRouter.get('/me', (req, res) => {
        res.send(req.decoded);
    });

    return userRouter;
}

export default UserRoutes;
