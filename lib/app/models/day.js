import mongoose from 'mongoose';

const
    Schema = mongoose.Schema,
    DaySchema = new Schema({
        routineId: String,
        subRoutineId: String,
        date: Number,
        value: Number,
        userId: String,
        createdDate: Number,
        modifiedDate: Number,
    });

export default mongoose.model('Day', DaySchema);
