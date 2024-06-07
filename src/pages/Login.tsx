import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../assets/Logo_MEXAR.png";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler,Controller } from "react-hook-form";
import CustomSwitch from "../components/Switch";
import { useEffect, useState } from "react";
import * as yub from "yup";
import OTPInput from "../components/OtpInput";
import { loginSchema } from "../Validations/loginValidation";
import { Alert } from "antd";
import { notification, Space } from "antd";
import {
  useLoginMutation,
  useVerifyOtpMutation,useGetUserTransactionQuery
} from "../services/jsonServerApi";
import { MdMoodBad } from "react-icons/md";

const Login = () => {
  const [step, setStep] = useState<String>("getBasicInfomation");
  const navigate = useNavigate();
  const { register, handleSubmit,control } = useForm({ mode: "onChange" });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [login] = useLoginMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [userLoginData, setUserLoginData] = useState({});
  const [loginByPhone, setLoginByPhone] = useState(true);
  

  const openNotification = () => {
    notification.open({
      message: "Warning!",
      description: alertMessage,
      icon: <MdMoodBad style={{ color: "red" }} />,
    });
  };
  const handleSendOtp = async (formData: any) => {
    console.log("formData :>> ", formData);
    const isValid = await loginSchema.isValid(formData);
    if (isValid) {
      const res = await login(formData);
      console.log("res :>> ", res.data);
      if (res?.data?.meta?.code == 200) {
        setUserLoginData(formData);
        setStep("getOtp");
      } else {
        setAlertMessage("Wrong username or password!");
        openNotification();
      }
    } else {
      setAlertMessage("username or password is not valid!");
      openNotification();
    }
  };

  const handleLogin =async (formData: any) => {
    console.log("formData :>> ", formData);
    const res = await verifyOtp(formData)
    console.log('response',res);
    if (res?.data?.meta?.code == 200) {
      setUserLoginData(formData);
      const access_token = res?.data?.data?.access_token
      localStorage.setItem('access_token',access_token)
      navigate("/home");

    } else {
      setAlertMessage("Wrong username or password!");
      openNotification();
    }
  };

  return (
    <>
      {showAlert && (
        <div className="m-5 ">
          <Alert
            message={alertMessage}
            type="error"
            closable
            afterClose={() => setShowAlert(false)}
          />
        </div>
      )}
      <div className="flex flex-col  justify-center gap-9 content-around h-full items-center drop-shadow-md">
        <div className="text-4xl flex flex-rows text-center gap-4 ">
          <div className="bg-white p-3 rounded-3xl drop-shadow-lg	">
            <img
              className="drop-shadow-md	"
              height={100}
              width={100}
              src={Logo}
            />
          </div>
          <div className="text-white font-semibold content-center">MEXAR</div>
        </div>
        <div className="bg-[#9FC3F5] text-blue p-5  w-[90vw] md:w-[30vw] xl:w-[20vw] rounded-2xl flex flex-col gap-5 ">
          {step == "getBasicInfomation" && (
            <>
              <div className="text-white text-right flex flex-row gap-3 justify-end">
                <p>
                  Login by <b>{loginByPhone ? "Phone" : "Email"}</b>
                </p>
                <CustomSwitch onChange={() => setLoginByPhone(!loginByPhone)} />
              </div>

              {(loginByPhone && (
                <Input
                  {...register("username")}
                  placeholder="username"
                  type="username"
                  maxLength={20}
                />
              )) || (
                <Input
                  {...register("phone")}
                  type="phone"
                  placeholder="Phone Number"
                />
              )}
              <div className="flex flex-col justify-end text-end gap-2">
                <Input
                  {...register("password")}
                  placeholder="password"
                  type="password"
                  maxLength={20}
                />
                <div className="text-sm  text-gray-600">Forgot Password?</div>
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={handleSubmit(handleSendOtp)}
              >
                SEND OTP
              </Button>
            </>
          )}
          {step == "getOtp" && (
            <>
              <div className="flex flex-col gap-4">
                <p className="text-white">
                  We sent a verification code to your mobile or email.
                  <b>human@example.com</b>{" "}
                </p>
                <b className="text-white text-2xl">
                  Type your 6 digits security code
                </b>
                <Controller
        name="otp"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <OTPInput
            length={6}
            value={field.value}
            onChange={field.onChange}
            onComplete={(pin) => {
              field.onChange(pin);
              // You can add additional onComplete logic here
            }}
          />
        )}
      />
                <p className="text-white self-end">
                  Didn't get code?{" "}
                  <span className="text-slate-700 underline">Resent</span>{" "}
                </p>
                <Button className="w-full" onClick={handleSubmit(handleLogin)}>
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
