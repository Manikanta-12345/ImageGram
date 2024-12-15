import mongoose from "mongoose";
import bcrypt from "bcrypt";
//user schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
      minLength: 5,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      minLength: 5,
      validate: {
        validator: function (emailValue) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            emailValue
          );
        },
        message: "Invalid email format",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function encodePassword(next) {
  // incoming user object
  const user = this; // object with plain password

  const SALT = bcrypt.genSaltSync(9);

  // hash password

  const hashedPassword = bcrypt.hashSync(user.password, SALT);

  // replace plain password with hashed password
  user.password = hashedPassword;
  next();
});

//create model or entity from schema

const user = mongoose.model("User", userSchema);

//do db operations

export default user;
