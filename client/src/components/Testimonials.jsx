import { assets, testimonialsData } from "../assets/assets";
import { delay, motion } from "motion/react"

export default function Testimonials(){
  return(
    <motion.div className="flex flex-col items-center justify-center my-16 sm:my-20 md:my-24 p-4 sm:p-6 md:px-28 w-full" initial={{opacity:0.2,y:100}} transition={{duration:1}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
     <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-center">Customer testimonials</h1>
      <p className="text-gray-500 mb-8 sm:mb-12 text-center">What Our User Are Saying</p>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
        {testimonialsData.map((testimonail,index)=>(
            <div key={index} className="bg-white/20 p-6 sm:p-8 md:p-12 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm cursor-pointer hover:scale-[1.02] transition-all">
                <div className="flex flex-col items-center">
                    <img src={testimonail.image} alt="" className="rounded-full w-12 sm:w-14"/>
                    <h2 className="text-lg sm:text-xl front-semibold mt-3 text-center">{testimonail.name}</h2>
                    <p className="text-gray-500 mb-4 text-sm sm:text-base">{testimonail.role}</p>
                    <div className="flex mb-4">
                      {Array(testimonail.stars).fill().map((item,index)=>(
                        <img key={index} src={assets.rating_star} alt="" className="w-4 h-4 sm:w-5 sm:h-5"/>
                      ))}
                    </div>
                    <p className="text-center text-sm text-gray-600">{testimonail.text}</p>
                </div>

            </div>
        ))}
      </div>

    </motion.div>
  )
}