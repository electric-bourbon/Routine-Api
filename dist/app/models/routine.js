'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var RoutineSchema = new Schema({
    name: String,
    style: String, // '4-day',  'complex'
    startDate: Number,
    desiredFrequency: Number,
    createdDate: Number,
    modifiedDate: Number,
    userId: String
});

exports.default = _mongoose2.default.model('Routine', RoutineSchema);