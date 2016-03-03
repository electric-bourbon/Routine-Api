'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var RoutineSchema = new Schema({
  routineName: String,
  routineStyle: String, // '4-day',  'complex'
  status: Number,
  completed: Boolean,
  startDate: Number,
  endDate: Number,
  createdDate: Number,
  modifiedDate: Number,
  userId: String

});

module.exports = _mongoose2.default.model('Routine', RoutineSchema);