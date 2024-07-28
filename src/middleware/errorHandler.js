function handleError(error, req, res, next) {
  console.error(error);

  const statusCode = error.statusCode || 500;
  const errorMessage =
    statusCode === 500 ? "Internal Server error" : error.message;

  res.status(statusCode).json({
    status: "fail",
    errorMessage,
  });
}

export default handleError;
