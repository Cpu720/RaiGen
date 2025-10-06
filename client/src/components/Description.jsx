import { assets } from "../assets/assets";
import { delay, motion } from "motion/react"

export default function Description(){
  return(
    <motion.div initial={{opacity:0.2,y:100}} transition={{duration:1}} whileInView={{opacity:1,y:100}} viewport={{once:true}} className="flex flex-col items-center justify-center my-16 sm:my-20 md:my-24 p-4 sm:p-6 md:px-28">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-center">Create AI Images</h1>
      <p className="text-gray-500 mb-6 sm:mb-8 text-center">Turn your imagination into visuals</p>
      
      <div className="flex flex-col gap-5 sm:gap-8 md:gap-14 md:flex-row items-center w-full">
        <img src={assets.sample_img_1} alt="" className="w-full max-w-xs sm:max-w-sm md:max-w-md xl:max-w-lg rounded-lg h-auto"/>
        <div className="text-center md:text-left px-1 sm:px-0 min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl front-medium max-w-lg">Introducing the AI-powered Text to Image Generator</h2>
            <p className="text-grey-600 mb-4 text-sm sm:text-base">Easily bring your ideas to life with our free AI image generator.Whether your need stunningvisuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks.Imagine it, describe it, and watch it come to life instantly.</p>
            <p className="text-grey-600 text-sm sm:text-base">Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualzed effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!</p>
        </div>
      </div>
    </motion.div>
  )
}