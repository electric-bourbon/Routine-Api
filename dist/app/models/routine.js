'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('Routine', RoutineSchema);