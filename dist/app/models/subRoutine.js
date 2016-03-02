var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubRoutineSchema = new Schema({
  name: String,
  status: Number,
  desiredFrequency: Number,
  currentCount: Number,
  completed: Boolean,
  routineId: String,
  userId: String
});

module.exports = mongoose.model('SubRoutine', SubRoutineSchema);