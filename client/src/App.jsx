import { Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Result from "./pages/Result"
import BuyCredit from "./pages/BuyCredit"
import Footer from "./components/Footer"
import Login from "./components/Login"
import OTPVerification from "./components/OTPVerification"
import { useContext } from "react"
import { AppContext } from "./context/AppContext"
import { ToastContainer } from 'react-toastify'
export default function App(){

const{showLogin} = useContext(AppContext)

  return(
    <div className="overflow-x-hidden px-2 sm:px-4 md:px-8 lg:px-16 xl:px-28 min-h-screen bg-gradient-to-b from-teal-100 to-orange-200">
      <ToastContainer position="bottom-right"/>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/buycredit" element={<BuyCredit/>}/>
        <Route path="/verify-otp" element={<OTPVerification/>}/>
      </Routes>
      <Footer/>

    </div>
  )
}