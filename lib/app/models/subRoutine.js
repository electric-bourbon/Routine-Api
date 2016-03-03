import mongoose from 'mongoose';

const
    Schema = mongoose.Schema,
    SubRoutineSchema = new Schema({
        name: String,
        desiredFrequency: Number,
        routineId: String,
        createdDate: Number,
        modifiedDate: Number,
        startDate: Number,
        userId: String
    });

export default mongoose.model('SubRoutine', SubRoutineSchema);
