import mongoose from 'mongoose';
const Schema       = mongoose.Schema;

const SubRoutineSchema  = new Schema({
  name: String,
  status: Number,
  desiredFrequency: Number,
  currentCount: Number,
  completed: Boolean,
  routineId: String,
  userId: String
});

export default mongoose.model('SubRoutine', SubRoutineSchema);
