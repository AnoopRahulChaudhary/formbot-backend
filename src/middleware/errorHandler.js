function handleError(error, req, res, next) {
  console.error(error);

  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server error";

  res.status(statusCode).json({
    status: "fail",
    errorMessage,
  });
}

export default handleError;
