import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';
import path from 'path';
import moment from 'moment';
import userRoute from './app/routes/userRoutes';
import routineRoute from './app/routes/routineRoutes';
import subRoutineRoute from './app/routes/subRoutineRoutes';
import dayRoute from './app/routes/dayRoutes';

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(cors());
app.use(morgan('dev'));

//database connection
//mongoose.connect(config.database);
mongoose.connect('mongodb://localhost/routine');
// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// -- API ROUTES ---
const
    userRoutes = userRoute(app, express),
    routineRoutes = routineRoute(app, express),
    subRoutineRoutes = subRoutineRoute(app, express),
    dayRoutes = dayRoute(app, express);


app.use('/api', userRoutes);
app.use('/api', routineRoutes);
app.use('/api', subRoutineRoutes);
app.use('/api', dayRoutes);

// Exception handling
app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404);
        res.json({
            errorMessage: err.message || 'Not found'
        });
    } else if (err.status === 403) {
        res.status(403);
        res.json({
            errorMessage: err.message || "Request forbidden"
        })
    } else {
        return next(err);
    }

});

app.use((err, req, res, next) => {
    console.log('Internal server error ' + err)
    res.status(500);
    res.json({
        errorMessage: err.message || 'oops! something broke'
    });
});



// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// TODO create index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// ====================================
app.listen(config.port);
console.log('Running on ' + config.port + '...');
