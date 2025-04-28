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
  getWatchHistory,
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
router.route("/udpate-account").patch(updateAccountDetails);

router.route("/c/:username").get(verifyJwt, getUserChannelProfile);

router.route("/avatar").patch(verifyJwt, upload.single("avatar"), updateAvatar);
router
  .route("/cover-image")
  .patch(verifyJwt, upload.single("coverImage"), updateCoverImage);

router.route("/c/:username").get(verifyJwt, getUserChannelProfile);
router.route("/history").get(verifyJwt, getWatchHistory);

export default router;
