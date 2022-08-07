const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = (request, response, next) => {
  try {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token = (authorization.substring(7));

      request.token = token;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);
    request.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') { return response.status(404).json({ error: 'Invalid blog id' }); } // 11000 is the code for validation error

  if (error.message === 'ID not found') {
    return response.status(409).send({ error: error.message });
  }
  if (error.code === 11000) { return response.status(400).json({ error: 'Username should be unique' }); } // 11000 is the code for validation error

  if (error.name === 'JsonWebTokenError') { return response.status(401).json({ error: 'invalid token' }); }

  next(error);
  return response.status(500);
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
