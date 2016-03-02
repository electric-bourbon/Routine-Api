var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SevenDayAverageSchema = new Schema({
  SevenDayAverageName: String,
  status: Number,
  completed: Boolean,
  percentageComplete: Number,
  userId: String
});

module.exports = mongoose.model('SevenDayAverage', SevenDayAverageSchema);