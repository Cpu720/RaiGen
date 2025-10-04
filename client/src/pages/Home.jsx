import Description from "../components/Description";
import Footer from "../components/Footer";
import GenerateBtn from "../components/GenerateBtn";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Testimonials from "../components/Testimonials";

export default function Home(){
  return(
    <div >
    <Header/>
    <Steps/>
    <Description/>
    <Testimonials/>
    <GenerateBtn/>
    </div>
  )
}