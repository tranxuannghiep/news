const mongoose = require("mongoose");

class Mongo {
  gridfs = null;
  static connect = () => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connect to DB successfully!");
      })
      .catch((err) => console.log("Can not connect to DB"));
    const conn = mongoose.connection;
    conn.once("open", () => {
      // connect gridFs
      this.gridfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: process.env.BUCKET_NAME,
      });
    });
  };
}

module.exports = Mongo;
