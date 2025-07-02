const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    console.error("ERROR", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = errorHandler;
