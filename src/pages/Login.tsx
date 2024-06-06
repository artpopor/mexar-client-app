import Input from "../components/Input";
import Button from "../components/Button";
import Logo from '../assets/Logo_MEXAR.png'
import { useNavigate } from "react-router-dom";

import CustomSwitch from "../components/Switch";
import { useState } from "react";
import OTPInput from "../components/OtpInput";
const Login = () => {
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
    <div className="flex flex-col  justify-center gap-9 content-around h-full items-center drop-shadow-md">
      <div className="text-4xl flex flex-rows text-center gap-4 ">
        <div className="bg-white p-3 rounded-3xl drop-shadow-lg	">
          <img className="drop-shadow-md	" height={100} width={100} src={Logo} />
        </div>
        <div className="text-white font-semibold content-center">MEXAR</div>
      </div>
      <div className="bg-[#9FC3F5] text-blue p-5  w-[90vw] md:w-[30vw] xl:w-[20vw] rounded-2xl flex flex-col gap-5 ">
        {step == 'getBasicInfomation' &&
          <>
            <div className="text-white text-right flex flex-row gap-3 justify-end"><p>Login by <b>{loginByPhone ? "Phone" : 'Email'}</b></p>
              <CustomSwitch onChange={() => setLoginByPhone(!loginByPhone)} />
            </div>
            {loginByPhone && <Input type='text' placeholder='Username/Email' /> || <Input type='phone' placeholder='Phone Number' />}
            <div className="flex flex-col justify-end text-end gap-2">
              <Input placeholder='password' type="password" onChange={(e) => console.log(e.target.value)} maxLength={20} />
              <div className="text-sm  text-gray-600">Forgot Password?</div>
            </div>
            <Button className="w-full" onClick={handleSendOtp}>SEND OTP</Button></>
        }
        {step == 'getOtp' && (
          <>
            <div className="flex flex-col gap-4">
              <p className="text-white">We sent a verification code to your mobile or email.<b>human@example.com</b> </p>
              <b className="text-white text-2xl">Type your 6 digits security code</b>
              <OTPInput length={6} onComplete={()=>console.log("completeOTP")}/>
              <p className="text-white self-end">Didn't get code? <span className="text-slate-700 underline">Resent</span>  </p>
              <Button className="w-full" onClick={handleLogin}>Login</Button>
            </div>
          </>
        )}
      </div>
    </div>

  );
}

export default Login