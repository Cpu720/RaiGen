import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateOTP, sendOTPEmail } from "../utils/emailService.js";


const registerUser = async (req,res)=>{
    try {
        const{name,email,password} = req.body;

        if(!name || !email ||!password){
            return res.json({success:false, message:"Missing Details"})
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            if(existingUser.isVerified){
                return res.json({success:false, message:"User already exists with this email"});
            } else {
                // User exists but not verified, delete and recreate
                await userModel.findByIdAndDelete(existingUser._id);
            }
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const userData = {
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires,
            isVerified: false
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        // Send OTP email
        const emailResult = await sendOTPEmail(email, otp);
        
        if(!emailResult.success){
            await userModel.findByIdAndDelete(user._id);
            return res.json({success:false, message:"Failed to send verification email"});
        }

        res.json({
            success:true, 
            message:"Registration successful! Please check your email for verification code.",
            userId: user._id
        })

    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const loginUser = async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user = await userModel.findOne({email}) 

        if(!user){
            return res.json({success:false, message:"User does not exist"})
        }

        // Check if user is verified
        if(!user.isVerified){
            return res.json({success:false, message:"Please verify your email before logging in"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
                           
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

            res.json({success:true, token, user:{name:user.name}})

        }else{
            return res.json({success:false, message:"Invalid password"})
        }
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        if (!userId || !otp) {
            return res.json({ success: false, message: "Missing userId or OTP" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
            return res.json({ success: false, message: "User already verified" });
        }

        // Check if OTP is expired
        if (new Date() > user.otpExpires) {
            return res.json({ success: false, message: "OTP has expired. Please register again." });
        }

        // Verify OTP
        if (user.otp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        // Update user as verified and clear OTP
        await userModel.findByIdAndUpdate(userId, {
            isVerified: true,
            otp: undefined,
            otpExpires: undefined
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            success: true,
            message: "Email verified successfully!",
            token,
            user: { name: user.name }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const resendOTP = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.json({ success: false, message: "Missing userId" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
            return res.json({ success: false, message: "User already verified" });
        }

        // Generate new OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Update user with new OTP
        await userModel.findByIdAndUpdate(userId, {
            otp,
            otpExpires
        });

        // Send new OTP email
        const emailResult = await sendOTPEmail(user.email, otp);

        if (!emailResult.success) {
            return res.json({ success: false, message: "Failed to send verification email" });
        }

        res.json({
            success: true,
            message: "New verification code sent to your email"
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const userCredits = async (req,res)=>{
    try{
        const {userId}= req.body

        const user = await userModel.findById(userId)
        res.json({success:true,credits: user.creditBalance,user:{name:user.name}})
    } catch(error){  
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
} 

export {registerUser,loginUser,userCredits,verifyOTP,resendOTP} 