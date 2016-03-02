var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MonthSchema = new Schema({
  month: Number,
  year: Number,
  days: [{
    day: Number,
    percentageComplete: Number
  }],
  factorableDays: Number,
  routineId: String,
  userId: String
});

module.exports = mongoose.model('Month', MonthSchema);