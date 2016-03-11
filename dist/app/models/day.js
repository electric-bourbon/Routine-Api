'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema,
    DaySchema = new Schema({
    routineId: String,
    subRoutineId: String,
    date: Number,
    value: Number,
    userId: String,
    createdDate: Number,
    modifiedDate: Number
});

exports.default = _mongoose2.default.model('Day', DaySchema);