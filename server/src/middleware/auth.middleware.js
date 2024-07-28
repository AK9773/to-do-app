import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/apiError.utils.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unathorized Access");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken -otp -otpExpiration"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access token");
  }
});

const restrictUser = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === "admin") {
      next();
    } else if (!roles.includes(userRole)) {
      throw new ApiError(401, "Unauthorized to perform this task");
    } else {
      next();
    }
  };
};

export { verifyJwt, restrictUser };
