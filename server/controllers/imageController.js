import FormData from "form-data"
import userModel from "../models/userModel.js"
import axios  from "axios"
import { response } from "express"

export const generateImage = async (req , res)=>{  
    try{
        const {userId,prompt}= req.body

        const user = await userModel.findById(userId)

        if(!user || !prompt ){
            return res.json({success:false,message:"Missing Details"})
        }
        if(user.creditBalance === 0 || user.creditBalance < 0){   
            return res.json({success:false, message:"No Credit Balance", creditBalance:user.creditBalance})
        }
        const formData = new FormData()        //api code 1st
        formData.append("prompt",prompt)       //api code 2nd
        
    const {data} =   await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,{ headers:{"x-api-key":process.env.CLIPDROP_API,},responseType:"arraybuffer"})      //api code 3rd

     const base64Image = Buffer.from(data,"binary").toString("base64")           //api code 4th

    const resultImage = `data:image/png;base64,${base64Image}`                   //api code 5th

    await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance - 1})

    res.json({success:true,message:"Image Generated", creditBalance:user.creditBalance - 1 ,resultImage}) //api code 6th

    } catch (error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}