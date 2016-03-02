import mongoose from 'mongoose';
const Schema       = mongoose.Schema;

const SevenDayAverageSchema  = new Schema({
  SevenDayAverageName: String,
  status: Number,
  completed: Boolean,
  percentageComplete: Number,
  userId: String
});

module.exports = mongoose.model('SevenDayAverage', SevenDayAverageSchema);
