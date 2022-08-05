const errorHandler = (error, request, response, next) => {
  if (error.message === 'ID not found') {
    return response.status(409).send({ error: error.message });
  }
  next(error);
  return response.status(500);
};

module.exports = errorHandler;
