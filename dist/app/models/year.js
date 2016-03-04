'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var YearSchema = new Schema({
  year: Number,
  months: [{
    month: Number,
    percentageComplete: Number,
    factorableDays: Number
  }],
  routineId: String,
  userId: String
});

exports.default = mongoose.model('Year', YearSchema);