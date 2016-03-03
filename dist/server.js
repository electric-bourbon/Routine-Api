'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _userRoutes = require('./app/routes/userRoutes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _routineRoutes = require('./app/routes/routineRoutes');

var _routineRoutes2 = _interopRequireDefault(_routineRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API ROUTES ------------------------

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));

//database connection
_mongoose2.default.connect(_config2.default.database);

// set static files location
// used for requests that our frontend will make
app.use(_express2.default.static(__dirname + '/public'));

var userRoutes = (0, _userRoutes2.default)(app, _express2.default),
    routineRoutes = (0, _routineRoutes2.default)(app, _express2.default);

app.use('/api', userRoutes);
app.use('/api', routineRoutes);

// Exception handling
app.use(function (err, req, res, next) {
  if (err.status === 404) {
    res.status(404);
    res.json({ errorMessage: err.message || 'Not found' });
  } else if (err.status === 403) {
    res.status(403);
    res.json({ errorMessage: err.message || "Request forbidden" });
  } else {
    return next(err);
  }
});

app.use(function (err, req, res, next) {
  console.log('Internal server error ' + err);
  res.status(500);
  res.json({ errorMessage: err.message || 'oops! something broke' });
});

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER
// ====================================
app.listen(_config2.default.port);
console.log('Running on ' + _config2.default.port + '...');