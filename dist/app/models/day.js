'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema,
    DaySchema = new Schema({
  day: Number,
  month: Number,
  percentageComplete: Number,
  userId: String,
  routines: [{
    name: String,
    status: Number,
    completed: Boolean,
    updated: Boolean,
    routineId: String,
    subRoutine: [{
      name: String,
      status: Number,
      completed: Boolean,
      updated: Boolean,
      subRoutineId: String,
      desiredFrequency: Number,
      currentCount: Number
    }]
  }]
});

module.exports = _mongoose2.default.model('Day', DaySchema);