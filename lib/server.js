import express from 'express';
import bodyParser from 'body-parser';
import cors    from 'cors'
import morgan  from 'morgan';
import mongoose from 'mongoose';
import config  from './config';
import path    from 'path';
import moment  from 'moment';
// API ROUTES ------------------------
import userRoute from'./app/routes/userRoutes';
const  app        = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use(cors());
app.use(morgan('dev'));

//database connection
mongoose.connect(config.database);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));


const userRoutes = userRoute(app, express);

app.use('/api', userRoutes);

// Exception handling
app.use(function(err, req, res, next) {
  if(err.status === 404) {
    res.status(404);
    res.json({errorMessage: err.message || 'Not found'});
  } else if (err.status === 403) {
    res.status(403);
    res.json({errorMessage: err.message || "Request forbidden"})
  } else {
    return next(err);
  }

});


app.use(function(err, req, res, next) {
  console.log('Internal server error ' + err)
  res.status(500);
  res.json({errorMessage: err.message || 'oops! something broke'});
});

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Running on ' + config.port + '...');
