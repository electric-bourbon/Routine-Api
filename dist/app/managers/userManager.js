"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateUser = exports.getUsers = exports.getUser = exports.createUser = exports.deleteUser = undefined;

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUser(userModel, next) {
    var user = new _user2.default();
    user.name = userModel.name;
    user.password = userModel.password;
    user.email = userModel.email;

    console.log("Creating new user: " + user);

    user.save(function (err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000) {
                var userExists = new Error("The user with that email address already exists!");
                userExists.status = 500;
                return next(userExists);
            } else console.log("Error creating user : " + err);
            return next(err);
        }
        console.log("User Created");
    });

    return user;
}

function getUsers(next) {
    _user2.default.find({}, function (err, users) {
        if (err) {
            console.log("Error getting users: " + err);
            return next(err);
        }
        return users;
    });
}

function getUser(userId, next) {
    _user2.default.findById(userId, function (err, user) {
        if (!user) {
            var notFound = new Error("User not found");
            notFound.status = 404;
            return next(notFound);
        }

        if (err) {
            console.log("Error deleting user: " + err);
            next(err);
        }
        console.log("Retrieving user: " + user);
        return user;
    });
}

function updateUser(userId, userModel, next) {
    _user2.default.findById(userId, function (err, user) {

        if (err) {
            console.log("Error updating user: " + err);
            next(err);
        }

        if (userModel.name) user.name = userModel.name;
        if (userModel.password) user.password = userModel.password;
        if (userModel.email) user.email = userModel.email;

        user.save(function (err) {
            if (err) {
                next(err);
            }
            console.log("Updating user: " + user);
        });
    });
}

function deleteUser(userId, next) {
    _user2.default.remove({
        _id: userId
    }, function (err, user) {

        if (!user) {
            var notFound = new Error("User not found");
            notFound.status = 404;
            return next(notFound);
        }

        if (err) {
            console.log("Error deleting user: " + err);
            next(err);
        }
        console.log("User deleted");
    });
}

exports.deleteUser = deleteUser;
exports.createUser = createUser;
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.updateUser = updateUser;