import { Router } from "express";
import UserAuthController from "../../controllers/user/UserAuthController";
import upload from "../../middlewares/UploadImages";
import { authMiddleware } from "../../middlewares/AuthMiddleware";

const userRoute = Router();

userRoute.post(
  "/user/register",
  upload.single("profile_picture"),
  UserAuthController.registerUser
);

userRoute.post("/user/login", UserAuthController.loginUser);
userRoute.get("/user/profile", authMiddleware, UserAuthController.getProfile);

userRoute.put(
  "/user/profile",
  authMiddleware,
  upload.single("profile_picture"),
  UserAuthController.updateProfile
);

export default userRoute;
