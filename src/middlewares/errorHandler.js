const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log(err.stack);
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Erreur serveur'
  });
};

export default errorHandler;