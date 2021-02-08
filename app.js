const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const imageRouter = require('./service/image/routes');

const app = express();

app.set('trust proxy', 1); // This config is for the rate limiter. Used to get the source IP for the request.

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/image', imageRouter);

app.use('/', (req, res) => {
  res.json({ message: 'Nothing on /' }).status(200);
});

module.exports = app;
