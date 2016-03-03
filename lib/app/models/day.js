import mongoose from 'mongoose';

const
    Schema = mongoose.Schema,
    DaySchema = new Schema({
        routineId: String,
        day: Number,
        month: Number,
        completed: Boolean,
        userId: String,
    });

export default mongoose.model('Day', DaySchema);
