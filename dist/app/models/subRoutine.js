'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var SubRoutineSchema = new Schema({
  name: String,
  status: Number,
  desiredFrequency: Number,
  currentCount: Number,
  completed: Boolean,
  routineId: String,
  userId: String
});

module.exports = _mongoose2.default.model('SubRoutine', SubRoutineSchema);