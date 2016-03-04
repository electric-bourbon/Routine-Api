import User from '../models/user';

function deleteUser(req, next) {
    User.remove({
        _id: req.params.user_id
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

    });
}

export {
    deleteUser,
}
