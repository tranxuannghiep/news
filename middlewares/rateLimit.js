const rateLimit = require("express-rate-limit");

exports.limiter = (req, minutes) =>
  rateLimit({
    windowMs: minutes * 60 * 1000,
    max: req,
    message: `please try again after ${minutes} minutes`,
    skipSuccessfulRequests: true,
  });
