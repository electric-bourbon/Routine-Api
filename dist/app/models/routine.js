'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var RoutineSchema = new Schema({
  routineName: String,
  status: Number,
  completed: Boolean,
  startDate: Number,
  endDate: Number,
  subRoutines: [{
    id: String,
    name: String
  }],
  createdDate: Number,
  modifiedDate: Number,
  userId: String
});

module.exports = _mongoose2.default.model('Routine', RoutineSchema);