'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var superSecret = _config2.default.secret;

function verifyToken(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    _jsonwebtoken2.default.verify(token, superSecret, function (err, decoded) {

      if (err) {
        var forbidden = new Error("Forbidden, failed to authenticate token");
        forbidden.status = 403;
        return next(forbidden);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    var forbidden = new Error("Forbidden, no token provided");
    forbidden.status = 403;
    return next(forbidden);
  }
}

exports.default = verifyToken;