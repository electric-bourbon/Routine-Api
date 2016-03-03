import mongoose from 'mongoose';
const Schema       = mongoose.Schema;

const RoutineSchema  = new Schema({
  routineName: String,
  routineStyle: String, // '4-day',  'complex'
  status: Number,
  completed: Boolean,
  startDate: Number,
  endDate: Number,
  createdDate: Number,
  modifiedDate: Number,
  userId: String,

});

export default mongoose.model('Routine', RoutineSchema);
