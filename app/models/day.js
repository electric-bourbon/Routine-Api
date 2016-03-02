import mongoose from 'mongoose';
const
  Schema  = mongoose.Schema,
  DaySchema  = new Schema({
    day: Number,
    month: Number,
    percentageComplete: Number,
    userId: String,
    routines: [
      {
        name: String,
        status: Number,
        completed: Boolean,
        updated: Boolean,
        routineId: String,
        subRoutine: [
          {
            name: String,
            status: Number,
            completed: Boolean,
            updated: Boolean,
            subRoutineId: String,
            desiredFrequency: Number,
            currentCount: Number,
          }
        ]
      }
    ]
  });

module.exports = mongoose.model('Day', DaySchema);
