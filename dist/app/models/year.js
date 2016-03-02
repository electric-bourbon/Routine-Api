var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var YearSchema = new Schema({
  year: Number,
  months: [{
    month: Number,
    percentageComplete: Number,
    factorableDays: Number
  }],
  routineId: String,
  userId: String
});

module.exports = mongoose.model('Year', YearSchema);