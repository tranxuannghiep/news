const catchAsync = require("../../middlewares/async");
const mysql = require("../../config/mysql");
const ApiError = require("../../utils/ApiError");
exports.mysql_getAllUsers = catchAsync(async (req, res, next) => {
  mysql.query(`SELECT * FROM users`, (error, results, fields) => {
    if (error) {
      return next(new ApiError(400, error.message));
    }
    res.json({
      success: true,
      data: results,
    });
  });
});

exports.mysql_createUser = catchAsync(async (req, res, next) => {
  const { first_name, last_name, age, gender, country, email } = req.body;
  mysql.query(
    `INSERT INTO users(first_name,last_name,age,gender,country,email) VALUES(?,?,?,?,?,?)`,
    [first_name, last_name, age, gender, country, email],
    (error, results, fields) => {
      if (error) {
        return next(new ApiError(400, error.message));
      }
      res.json({
        success: true,
        data: results,
      });
    }
  );
});
