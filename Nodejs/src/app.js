const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const routes = require('./routes/');
const mongoose = require('mongoose');
const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


// gzip compression
app.use(compression());

const corsOptions = {
  origin: ('http://localhost:3000' || '').split(' '),
};
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://admin:admin@cluster0.7jna7.mongodb.net/football', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("connection to db");
});


// v1 api routes
app.use('/', routes);

const comments = require('./routes/comments');
app.use('/comments', comments);

app.use('/health', (req, res) => {
  res.send('Server is healthy');
});

module.exports = app;