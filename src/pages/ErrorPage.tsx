import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
const ErrorPage = () => {
    const navigate = useNavigate()
    return(
        <div className="flex flex-col  justify-center gap-9 content-around h-full items-center drop-shadow-md">
        
        <div className="bg-[#9FC3F5] text-2xl text-white p-5 text-center  w-[90vw] md:w-[30vw] xl:w-[20vw] rounded-2xl flex flex-col gap-5 ">
         Sorry... Something wrong!
         <Button onClick={()=>navigate('/')}>back home</Button>
        </div>
      </div>
    )

}
export default ErrorPage