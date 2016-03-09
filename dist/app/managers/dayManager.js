'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteAllDays = exports.deleteDay = exports.getDay = exports.getDaysForRoutine = exports.getDaysForSubRoutine = exports.createDayForSubRoutine = exports.createDayForRoutine = undefined;

var _day = require('../models/day');

var _day2 = _interopRequireDefault(_day);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDayForSubRoutine() {}

function createDayForRoutine() {}

function deleteDay() {}

function getDay() {}

function getDaysForRoutine() {}

function getDaysForSubRoutine() {}

function deleteAllDays(userId, next) {
    _day2.default.remove({ userId: userId }, function (err, day) {
        if (err) {
            console.log('Error deleting days: ' + err);
            next(err);
        }
    });
}

exports.createDayForRoutine = createDayForRoutine;
exports.createDayForSubRoutine = createDayForSubRoutine;
exports.getDaysForSubRoutine = getDaysForSubRoutine;
exports.getDaysForRoutine = getDaysForRoutine;
exports.getDay = getDay;
exports.deleteDay = deleteDay;
exports.deleteAllDays = deleteAllDays;