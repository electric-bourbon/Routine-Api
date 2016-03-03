'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema,
    SubRoutineSchema = new Schema({
    name: String,
    desiredFrequency: Number,
    style: String,
    routineId: String,
    createdDate: Number,
    modifiedDate: Number,
    startDate: Number,
    userId: String
});

exports.default = _mongoose2.default.model('SubRoutine', SubRoutineSchema);