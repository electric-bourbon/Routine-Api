import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        name: String,
        password: {
            type: String,
            required: true,
            select: false
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
    });

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
    let user = this;

    // hash the password only if the password has been changed or user is new
    if (!user.isModified('password')) return next();

    // generate the hash
    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err) return next(err);

        // change the password to the hashed version
        user.password = hash;
        next();
    });
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
    let user = this;

    return bcrypt.compareSync(password, user.password);
};

export default mongoose.model('User', UserSchema);
