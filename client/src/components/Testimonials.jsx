import { assets, testimonialsData } from "../assets/assets";
import { delay, motion } from "motion/react"

export default function Testimonials(){
  return(
    <motion.div className="flex flex-col items-center justify-center my-24 p-6 md:px-28" initial={{opacity:0.2,y:100}} transition={{duration:1}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
     <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Customer testimonials</h1>
      <p className="text-gray-500 mb-12">What Our User Are Saying</p>

      <div className="flex flex-items-wrap gap-6">
        {testimonialsData.map((testimonail,index)=>(
            <div key={index} className="bg-white/20 p-12 rounded-lg shadow-md order w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all">
                <div className="flex flex-col items-center">
                    <img src={testimonail.image} alt="" className="rounded-full w-14"/>
                    <h2 className="text-xl front-semibold mt-3">{testimonail.name}</h2>
                    <p className="text-gray-500 mb-4">{testimonail.role}</p>
                    <div className="flex mb-4">
                      {Array(testimonail.stars).fill().map((item,index)=>(
                        <img key={index} src={assets.rating_star} alt=""/>
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