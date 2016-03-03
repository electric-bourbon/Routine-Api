'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = _mongoose2.default.model('Routine', RoutineSchema);