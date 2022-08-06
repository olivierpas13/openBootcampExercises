const errorHandler = (error, request, response, next) => {
  if (error.message === 'ID not found') {
    return response.status(409).send({ error: error.message });
  }
  if (error.code === 11000) { return response.status(400).json({ error: 'Username should be unique' }); } // 11000 is the code for validation error

  if (error.name === 'JsonWebTokenError') { return response.status(401).json({ error: 'invalid token' }); }

  next(error);
  return response.status(500);
};

module.exports = errorHandler;
