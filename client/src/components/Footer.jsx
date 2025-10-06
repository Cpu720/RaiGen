import { assets } from "../assets/assets";

export default function Footer(){
  return(
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-4 sm:py-3 mt-10 sm:mt-20 w-full">
        <img src={assets.logo} alt="" className="w-24 sm:w-32 md:w-40 h-auto" />
        <p className="flex-1 text-center sm:text-left border-l-0 sm:border-l border-gray-400 pl-0 sm:pl-4 text-xs sm:text-sm text-gray-500">Copyright @Chankya.dev | All right reserved.</p>

        <div className="flex gap-2 sm:gap-2.5">
            <img src={assets.facebook_icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
            <img src={assets.twitter_icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
            <img src={assets.instagram_icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      
    </div>
  )
}