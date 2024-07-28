import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  updateAvatar,
} from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/getUser").get(verifyJwt, getUser);
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refreshAccessToken").post(refreshAccessToken);
router.route("/changePassword").patch(verifyJwt, changePassword);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").patch(resetPassword);
router
  .route("/updateAvatar")
  .patch(verifyJwt, upload.single("avatar"), updateAvatar);

export default router;
