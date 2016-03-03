'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MonthSchema = new Schema({
  month: Number,
  year: Number,
  days: [{
    day: Number,
    percentageComplete: Number
  }],
  factorableDays: Number,
  routineId: String,
  userId: String
});

exports.default = mongoose.model('Month', MonthSchema);