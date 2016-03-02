import mongoose from 'mongoose';
const Schema       = mongoose.Schema;

const YearSchema  = new Schema({
  year: Number,
  months: [
    {
      month: Number,
      percentageComplete: Number,
      factorableDays: Number,
    }
  ],
  routineId: String,
  userId: String
});

module.exports = mongoose.model('Year', YearSchema);
