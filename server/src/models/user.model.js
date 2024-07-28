import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    otp: {
      type: Number,
    },
    otpExpiration: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = async function () {
  return Jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

UserSchema.methods.generateRefreshToken = async function () {
  return Jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", UserSchema);
