
import Logo from '../../assets/Logo_MEXAR.png'
import { useNavigate } from "react-router-dom";
import { GoGear } from "react-icons/go";

import { useState } from "react";
const HomePage = () => {
    const [step, setStep] = useState<String>('getBasicInfomation')
    const navigate = useNavigate();
    const handleSendOtp = () => {
        setStep('getOtp')
    }
    const handleLogin = () => {
        navigate("/home");
    }
    const [loginByPhone, setLoginByPhone] = useState(false)
    return (
        <div className="flex flex-col  justify-start gap-3 content-around h-full items-center drop-shadow-md">

            <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
                <div className='text-white text-2xl content-center '>
                    <GoGear/>
                </div>
                <div className='text-white  font-semibold content-center text-center'><p>hello Jenny</p></div>
            </div>
{/* maincontent here */}
            <div className="bg-white text-blue p-5  w-full md:w-[80vw] rounded-3xl h-full flex flex-col gap-5 ">

            </div>
        </div>

    );
}

export default HomePage