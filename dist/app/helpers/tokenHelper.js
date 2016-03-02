
var jwt = require('jsonwebtoken');
var config = require('../../config');
var superSecret = config.secret;

function verifyToken(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, superSecret, function (err, decoded) {

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

module.exports = verifyToken;