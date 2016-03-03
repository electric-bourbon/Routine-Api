var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MonthSchema  = new Schema({
  month: Number,
  year: Number,
  days: [
    {
      day: Number,
      percentageComplete: Number,
    }
  ],
  factorableDays: Number,
  routineId: String,
  userId: String
});

export default mongoose.model('Month', MonthSchema);
