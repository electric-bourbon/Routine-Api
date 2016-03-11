import User from '../models/user';

function createUser(userModel, next) {
    let user = new User();
    user.name = userModel.name;
    user.password = userModel.password;
    user.email = userModel.email;

    console.log(`Creating new user: ${user}`);

    return user.save((err) => {
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
        return user;
    });


}

function getUsers(next) {
    User.find({}, (err, users) => {
        if (err) {
            console.log(`Error getting users: ${err}`);
            return next(err);
        }
        return users;
    });
}

function getUser(userId, next) {
    return promises.getUser(userId, (err, user) => {
        if (!user) {
            var notFound = new Error("User not found");
            notFound.status = 404;
            return next(notFound);
        }
        if (err) {
            console.log(`Error getting user: ${err}`);
            next(err);
        }
        console.log(`Retrieving user: ${user}`);
        return user;
    });
}

function updateUser(userId, userModel, next) {
    return promises.getUser(userId, (err, user) => {

        if (err) {
            console.log(`Error updating user: ${err}`);
            next(err);
        }

        if (userModel.name) user.name = userModel.name;
        if (userModel.password) user.password = userModel.password;
        if (userModel.email) user.email = userModel.email;

        user.save((err) => {
            if (err) {
                next(err);
            }
            console.log(`Updating user: ${user}`);
        });
    });
}

function deleteUser(userId, next) {
    return User.remove({
        _id: userId
    }, function(err, user) {

        if (!user) {
            var notFound = new Error("User not found");
            notFound.status = 404;
            return next(notFound);
        }

        if (err) {
            console.log(`Error deleting user: ${err}`);
            next(err);
        }
        console.log("User deleted");
    });
}

const promises = {
    getUser(userId, callback) {
        return User.findById(userId, (err, user) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, user);
            }
        });
    },
 }

export {
    deleteUser,
    createUser,
    getUser,
    getUsers,
    updateUser,
}
