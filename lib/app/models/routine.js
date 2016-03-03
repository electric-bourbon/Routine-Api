import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
    name: String,
    style: String, // '4-day',  'complex'
    startDate: Number,
    desiredFrequency: Number,
    createdDate: Number,
    modifiedDate: Number,
    userId: String,
});

export default mongoose.model('Routine', RoutineSchema);
