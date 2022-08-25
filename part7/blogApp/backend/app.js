const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');

const loginRouter = require('./controllers/login');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const testingRouter = require('./controllers/testing');
const { errorHandler, tokenExtractor } = require('./utils/middleware');
const logger = require('./utils/logger');

const app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(tokenExtractor);
app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);
// if (process.env.NODE_ENV === 'test') {
/* eslint-disable */
  /* eslint-enable */
app.use('/api/testing', testingRouter);
// }

app.use(errorHandler);

module.exports = app;
