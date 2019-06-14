const express = require('express');
const app = express();
const morgan = require('morgan');
var cors = require('cors')
const eventRoutes = require('./api/Routes/Event');
const userRoutes = require('./api/Routes/user');
const requestedEventsRoutes = require('./api/Routes/requestedEvents');
const newsMailRoutes = require('./api/Routes/newsMail');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/images',express.static('./images'))
app.use(cors());

app.use('/event',eventRoutes);
app.use('/user',userRoutes);
app.use('/newsMail',newsMailRoutes)
app.use('/requestedEvents', requestedEventsRoutes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '');
    res.header('Access-Control-Allow-headers', '');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','*');
        return res.status(200).json({});
    }

    next();

});
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
     res.status(error.status || 500);
     res.json({
         error: {
             message: error.message
         }
     })
 
 });


module.exports = app; 