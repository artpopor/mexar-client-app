import { useNavigate } from "react-router-dom";
import { GoGear } from "react-icons/go";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { FaChevronRight } from "react-icons/fa";
import MenuBar from "../components/MenuBar";
import { IoChevronBack } from "react-icons/io5";
import ProfileSection from "./ProfileSection";
import CustomSelect from "../components/Select";
// import Input from "../components/Input";

import UploadArea from "../components/UploadArea";
import { Input, Select, Space, Checkbox } from "antd";
import CurrencyWithAmount from "../components/CurrencyWithAmount";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  useGetCurrencyListQuery,
  useGetCountryListQuery,
} from "../services/jsonServerApi";
const Remmittance = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const [disabledRate, setDisableRate] = useState(true);
  const [step, setStep] = useState("Step1");
  const { data, error, isLoading } = useGetCurrencyListQuery(
    localStorage.getItem("access_token")
  );
  const CountryListData = useGetCountryListQuery(
    localStorage.getItem("access_token")
  );
  const { Search } = Input;
  const sortedData = CountryListData?.data?.data
    ?.slice()
    .sort((a: any, b: any) => a.common_name.localeCompare(b.common_name));

  const onConfirm = () => {
    navigate('/home')
  }
  return (
    <div className="flex flex-col  justify-start  content-around  items-center drop-shadow-md h-full">
      {/* Main Content here */}
      {step == "Step1" && (
        <>
          <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
            <div
              onClick={() => navigate("/home")}
              className="text-white text-xl flex flex-cols gap-3 cursor-pointer "
            >
              <IoChevronBack className="text-xl self-center" />
              <p className="self-center">Back</p>
            </div>
            <ProfileSection />
          </div>
          <p className="text-white text-start w-full mt-2 px-4 text-2xl md:w-[80vw]  ">
            01 - Enter order Detail
          </p>
          <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col gap-5 justify-between rounded-b-none">
            <div className="flex flex-col gap-2">
              <p className="font-thin text-gray-500">Destination Country</p>
              <CustomSelect
                className="h-12 justify-center content-center"
                placeholder="Select Country"
              >
                {sortedData?.map((country: any) => (
                  <div
                    key={country.common_name}
                    className="w-full flex flex-rows"
                  >
                    <img
                      className="rounded-md w-5 h-5 self-center"
                      src={country.flag}
                      alt={country.common_name}
                    />
                    <p>{country.common_name}</p>
                  </div>
                ))}
              </CustomSelect>
              <p className="font-thin text-gray-500">From Currency</p>
              <div className="w-full">
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={{ code: "THB", amount: "" }}
                  render={({ field }) => (
                    <CurrencyWithAmount
                      {...field}
                      placeholder="amount"
                      countries={data?.data || []}
                    />
                  )}
                />
              </div>
              <p className="font-thin text-gray-500">Sale rate</p>
              <Input
                className="border border-none drop-shadow-md h-12 rounded-xl"
                placeholder={"amount"}
                defaultValue="0.3"
              />
              <p className="font-thin text-gray-500">To Currency</p>
              <div className="w-full">
                <Controller
                  name="toCurrency"
                  control={control}
                  defaultValue={{ code: "THB", amount: "" }}
                  render={({ field }) => (
                    <CurrencyWithAmount
                      {...field}
                      placeholder="amount"
                      countries={data?.data || []}
                    />
                  )}
                />
              </div>{" "}
              <div
                className="flex flex-cols gap-2 cursor-pointer"
                onClick={() => setDisableRate(!disabledRate)}
              >
                <Checkbox checked={disabledRate} />
                <p className="font-thin text-gray-500">Rate</p>
              </div>
              <Input
                className="border border-none drop-shadow-md h-12 rounded-xl"
                placeholder={"Rate"}
                disabled={disabledRate}
              />
            </div>

            <Button
              className="w-full mb-[100px] text-white font-light drop-shadow-md !bg-[#2d4da3]"
              onClick={() => setStep("Step2")}
            >
              Next
            </Button>
          </div>
        </>
      )}
      {step == "Step2" && (
        <>
          <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
            <div
              onClick={() => setStep("Step1")}
              className="text-white text-xl flex flex-cols gap-3 cursor-pointer "
            >
              <IoChevronBack className="text-xl self-center" />
              <p className="self-center">Back</p>
            </div>
            <ProfileSection />
          </div>
          <p className="text-white text-start w-full mt-2 px-4 text-2xl md:w-[80vw]  ">
            02 - Customer Infomation
          </p>
          <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col gap-5 justify-between rounded-b-none">
            <div className="flex flex-col gap-3">
              <p className="font-thin text-gray-500">Select custormer</p>
              <Search
                placeholder="input search text"
                onSearch={() => console.log("search")}
                className="w-full h-12"
              />

              <div className="flex flex-cols gap-2 w-full">
                <Checkbox />
                <p className="font-thin text-gray-500 text-sm">
                  Select and Recieve account
                </p>
              </div>
              <p className="font-thin text-gray-500">Transaciton Purpose</p>
              <CustomSelect className="h-12" placeholder="Select Purpose" />

              <p className="font-thin text-gray-500">Document Type</p>
              <CustomSelect
                className="h-12 mb-3"
                placeholder="Select Document Type"
              />
              <UploadArea />
            </div>
            <Button
              className="w-full mb-[100px] text-white font-light drop-shadow-md !bg-[#2d4da3]"
              onClick={() => setStep("Step3")}
            >
              Next
            </Button>
          </div>
        </>
      )}
      {step == "Step3" && (
        <>
          <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
            <div
              onClick={() => setStep("Step2")}
              className="text-white text-xl flex flex-cols gap-3 cursor-pointer "
            >
              <IoChevronBack className="text-xl self-center" />
              <p className="self-center">Back</p>
            </div>
            <ProfileSection />
          </div>
          <p className="text-white text-start w-full mt-2 px-4 text-2xl md:w-[80vw]  ">
            03 - Review Infomation
          </p>
          <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col gap-5 justify-between rounded-b-none">
            <div className="flex flex-col gap-2">
              <p className="font-thin text-gray-500">Select custormer</p>
              <div className="border border-none w-full bg-white drop-shadow-md h-12 rounded-xl "></div>
              <div className="flex flex-cols gap-2 w-full">
                <Checkbox disabled defaultChecked={true} />
                <p className="font-thin text-gray-500">
                  Select and Recieve account
                </p>
              </div>
              <div className="mt-2">
                <div className="flex flex-cols justify-between">
                  <p className="font-thin text-gray-500">
                    Purpose of Transaction
                  </p>
                  <p className="font-normal text-gray-500">Family</p>
                </div>
                
                <hr className="m-1 w-full" />
              </div>
              <div className="">
                <div className="flex flex-cols justify-between">
                  <p className="font-thin text-gray-500">
                    Purpose of Transaction
                  </p>
                  <p className="font-normal text-gray-500">Family</p>
                </div>
                
                <hr className="m-1 w-full" />
              </div>
              <p className=" text-gray-500 font-medium">Transaction file</p>
              <img className="w-[50%]" src='https://images.template.net/wp-content/uploads/2017/05/Salary-Payment.jpg'/>
            </div>

            <Button
              className="w-full mb-[100px] text-white font-light drop-shadow-md !bg-[#2d4da3]"
              onClick={() => onConfirm()}
            >
              Confirm
            </Button>
          </div>
        </>
      )}
      <MenuBar />
    </div>
  );
};
export default Remmittance;
