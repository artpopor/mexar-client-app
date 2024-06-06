import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from '../../assets/Logo_MEXAR.png'
import { useNavigate } from "react-router-dom";

import CustomSwitch from "../../components/Switch";
import { useState } from "react";
import { Switch } from "antd";
const Login = () => {
  const navigate = useNavigate();
  const handleSummit = () => {
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
        <div className="text-white text-right flex flex-row gap-3 justify-end"><p>Login by <b>{loginByPhone ? "Phone" : 'Email'}</b></p>
        <CustomSwitch onChange={()=>setLoginByPhone(!loginByPhone)} />
        </div>
        {loginByPhone && <Input type='text' placeholder='username/email' /> || <Input type='phone' placeholder='Phone Number' />}
        <div className="flex flex-col justify-end text-end gap-2">
          <Input placeholder='password' onChange={(e) => console.log(e.target.value)} />
          <div className="text-sm  text-gray-600">Forgot Password?</div>
        </div>
        <Button onClick={handleSummit}>SEND OTP</Button>
      </div>
    </div>

  );
}

export default Login