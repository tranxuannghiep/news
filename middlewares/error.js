const catchError = (err, req, res, next) => {
  // console.log(JSON.stringify(err,null,2))
  // xử lí các error
  // lỗi liên quan đến validation
  if (err.name === "ValidationError") {
    const errors = err.errors;
    const keys = Object.keys(errors);
    const errorObj = {};
    keys.forEach((key) => {
      errorObj[key] = errors[key].message;
      if (errors[key].kind === "enum") {
        errorObj[key] = "invalid enum value";
      }
    });
    err.statusCode = 400;
    err.message = errorObj;
  }

  // bad ObjectId
  if (err.kind === "ObjectId") {
    err.statusCode = 400;
    err.message = "Invalid Id";
  }

  //dupplicate filed
  if (err.code === 11000) {
    err.statusCode = 400;
    const filed = Object.keys(err.keyValue)[0]; // email
    err.message = `${filed} is dupplicate`;
  }
  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Interal Error!",
  });
};

module.exports = catchError;
