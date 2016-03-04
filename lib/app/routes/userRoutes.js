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

    // ----------------------------------------------------
    userRouter.route('/users')
        .post((req, res, next) => {

            let user = new User(); // create a new instance of the User model
            user.name = req.body.name; // set the users name (comes from the request
            user.password = req.body.password; // set the users password (comes from the request)
            user.email = req.body.email;

            console.log(`Creating new user: ${user}`);

            user.save((err) => {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000) {
                        let userExists = new Error("The user with that email address already exists!");
                        userExists.status = 500;
                        return next(userExists);
                    } else
                        console.log(`Error creating user : ${err}`);
                    return next(err);
                }
                console.log("User Created");
                res.json({
                    message: 'User created!'
                });
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

        User.find({}, (err, users) => {
            if (err) {
                console.log(`Error getting users: ${err}`);
                return next(err);
            }
            // return the users
            res.json(users);
        });
    });

    userRouter.route('/users/:user_id')
        .get((req, res, next) => {
            User.findById(req.params.user_id, (err, user) => {
                if (!user) {
                    var notFound = new Error("User not found");
                    notFound.status = 404;
                    return next(notFound);
                }

                if (err) {
                    console.log(`Error deleting user: ${err}`);
                    next(err);
                }
                console.log(`Retrieving user: ${user}`);
                // return that user
                res.json(user);
            });
        })

    // update the user with this id
    .put((req, res, next) => {
            User.findById(req.params.user_id, (err, user) => {

                if (err) {
                    console.log(`Error updating user: ${err}`);
                    next(err);
                }

                // set the new user information if it exists in the request
                if (req.body.name) user.name = req.body.name;
                if (req.body.password) user.password = req.body.password;
                if (req.body.email) user.email = req.body.email;
                // save the user
                user.save((err) => {
                    if (err) {
                        next(err);
                    }
                    console.log(`Updating user: ${user}`);
                    res.json({
                        message: 'User updated!'
                    });
                });

            });
        })
        .delete((req, res, next) => {
            const userId = req.decoded.id;
            DayManager.deleteAllDays(userId, next);
            SubRoutineManager.deleteAllSubRoutines(userId, next);
            RoutineManager.deleteAllRoutines(userId, next);
            UserManager.deleteUser(req, next);

            console.log("User deleted");
            res.json({
                message: 'Successfully deleted'
            });
        });

    userRouter.use('/me', (req, res, next) => {
        verifyToken(req, res, next);
    });
    // api endpoint to get user information
    userRouter.get('/me', (req, res) => {
        res.send(req.decoded);
    });

    return userRouter;
}

export default UserRoutes;
