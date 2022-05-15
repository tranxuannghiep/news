const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { ROLE } = require("../config");
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "Must be at least 6 character"],
      maxlength: [30, "Must be less than 30 character"],
    },
    role: {
      type: String,
      enum: ROLE,
      default: ROLE.GUEST,
    },
    age: Number,
    books: [String],
  },
  {
    collection: "nb-users",
    timestamps: true,
  }
);
//middleware -- hash Password
UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    // truoc khi luu - can hash password
    const salt = bcrypt.genSaltSync(); // default round = 10
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

// UserSchema.pre("updateOne", function (next) {
//   if (this.isModified("password")) {
//     // truoc khi luu - can hash password
//     const salt = bcrypt.genSaltSync(); // default round = 10
//     const hashedPassword = bcrypt.hashSync(this.password, salt);
//     this.password = hashedPassword;
//   }
//   next();
// });

module.exports = mongoose.model("User", UserSchema);
