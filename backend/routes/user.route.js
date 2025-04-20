import express from "express";
import {
  checkAuth,
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logOutUser);
userRouter.get("/check", checkAuth);

export default userRouter;
