import express from "express"
import {registerUser,loginUser, userCredits, verifyOTP, resendOTP} from "../controllers/userController.js"
import userAuth from "../midddlewares/auth.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/credits", userAuth, userCredits)
userRouter.post("/verify-otp", verifyOTP)
userRouter.post("/resend-otp", resendOTP)

export default userRouter
