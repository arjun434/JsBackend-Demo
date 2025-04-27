import { Router } from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  refreshAccessToken,
  getCurrentUSer,
  changeCurrentPassword,
  getUserChannelProfile,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 2 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/update-password").post(verifyJwt, changeCurrentPassword);
router.route("current-user").get(verifyJwt, getCurrentUSer);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/c/:username").get(verifyJwt, getUserChannelProfile);

export default router;
