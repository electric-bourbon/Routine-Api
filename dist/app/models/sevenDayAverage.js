'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SevenDayAverageSchema = new Schema({
  SevenDayAverageName: String,
  status: Number,
  completed: Boolean,
  percentageComplete: Number,
  userId: String
});

exports.default = mongoose.model('SevenDayAverage', SevenDayAverageSchema);