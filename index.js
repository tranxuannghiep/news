require("dotenv").config();

const express = require("express");
const catchError = require("./middlewares/error");
const bookRoutes = require("./routes/bookRoute");
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoute");
const userRoutes = require("./routes/userRoute");
const uploadRoutes = require("./routes/uploadRoute");
const newsRoutes = require("./routes/newsRoute");

const mysql_userRoutes = require("./routes/mysql/mysql_userRoute");
const app = express();
app.use(express.json());
const MailService = require("./utils/MailService");
// const upload = require("./middlewares/uploads");
const Mongo = require("./config/db");
const uploadMongo = require("./middlewares/uploadMongo");
MailService.init();

Mongo.connect();
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/file", uploadRoutes);
app.use("/api/v1/news", newsRoutes);

app.use("/api/v1/mysql/users", mysql_userRoutes);
app.post("/test", uploadMongo.single("avatar"), (req, res) => {
  res.json({
    success: true,
    message: "upload avatar successfully!",
  });
});
// bắt lỗi mdw
app.use(catchError);

app.use((req, res, next) => {
  return res.json({
    message: "API not found",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});
