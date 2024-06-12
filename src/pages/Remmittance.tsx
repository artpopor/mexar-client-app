import { useNavigate } from "react-router-dom";
import { GoGear } from "react-icons/go";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { FaChevronRight } from "react-icons/fa";
import MenuBar from "../components/MenuBar";
import { IoChevronBack } from "react-icons/io5";
import ProfileSection from "./ProfileSection";
import CurSelectAndInput from "../components/CurSelectAndInput";
// import Input from "../components/Input";
import "../components/components.css";
import { FormProvider } from "react-hook-form";
import UploadArea from "../components/UploadArea";
import { Input, Select, Space, Checkbox } from "antd";
import CurrencyWithAmount from "../components/CurrencyWithAmount";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  useGetRateQuery,
  useGetCurrencyListQuery,
  useGetCountryListQuery,
} from "../services/jsonServerApi";
import CustomSelect from "../components/CustomSelect";
import CustomInput from "../components/CustomInput";
const Remmittance = () => {
  const navigate = useNavigate();
  const [fromCurrency, setFromCurrency] = useState("");
  // const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const [step, setStep] = useState("Step1");
  const access_token = localStorage.getItem("access_token");
  const { data, error, isLoading } = useGetCurrencyListQuery(access_token);
  const CountryListData = useGetCountryListQuery(access_token);
  const [FromSellRate, setFromSellRate] = useState("");
  const [ToSellRate, setToSellRate] = useState('');
  const [sellRate,setSellRate] = useState('')
  const [FromAmount, setFromAmount] = useState("");
  const [FromCode, setFromCode] = useState("");
  const [ToCode, setToCode] = useState("");
  const [ToAmount, setToAmount] = useState("");
  const RateData = useGetRateQuery(access_token);

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error]);
  const sortedData = CountryListData?.data?.data
    ?.slice()
    .sort((a: any, b: any) => a.common_name.localeCompare(b.common_name));


  const handleStep2 = (formData: any) => {
    console.log("formData :>> ", formData);
  };
  const methods = useForm();

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };


  const handleChangeFromCurrency = (value:{code:string,amount:string}) => {
    setFromAmount(value.amount)
    setFromCode(value.code)
    const currencySellRate = RateData?.data?.data?.filter(
      (item: any) => item?.currency?.code === value?.code
    );
    setFromSellRate(currencySellRate[0]?.public_sell)
    setSellRate(`${parseFloat(ToSellRate)/parseFloat(currencySellRate[0]?.public_sell)}`);

    const calToAmount = parseFloat(value?.amount)*(parseFloat(ToSellRate)/parseFloat(currencySellRate[0]?.public_sell))
    setToAmount(calToAmount.toString())
    console.log('calToAmount',calToAmount,currencySellRate[0]?.public_sell);
  }


  const handleChangeToCurrency = (value:{code:string,amount:string}) => {
    
    setToAmount(value.amount)
    setToCode(value.code)
    const currencySellRate = RateData?.data?.data?.filter(
      (item: any) => item?.currency?.code === value?.code
    );
    setToSellRate(currencySellRate[0]?.public_sell)
    setSellRate(`${parseFloat(currencySellRate[0]?.public_sell)/parseFloat(FromSellRate)}`);
    const calFromAmount = parseFloat(value?.amount)/(parseFloat(currencySellRate[0]?.public_sell)/parseFloat(FromSellRate))
    setFromAmount(calFromAmount.toString())
  }
  const handleChangeSellRate = (value:string) => {
    setSellRate(value)
    const calToAmount = (parseFloat(FromAmount)*parseFloat(value)).toString()
    setToAmount(calToAmount)
  }


  return (
    <div className="flex flex-col  justify-start  content-around  items-center drop-shadow-md h-full">
      {/* Main Content here */}
      {step == "Step1" && (
        <>
          <div className="flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
            <div
              onClick={() => navigate("/home")}
              className="text-white text-xl flex flex-cols gap-3 cursor-pointer "
            >
              <IoChevronBack className="text-xl self-center" />
              <p className="self-center">Back</p>
            </div>
            <ProfileSection />
          </div>
          <p className="text-white text-start w-full mt-2 px-4 text-2xl md:w-[80vw]" aria-placeholder="hello">
            01 - Enter order Detail
          </p>
          <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col gap-5 justify-between rounded-b-none">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                <div className="flex flex-col justify-between content-between h-full">
                  {/*CONTENT START HERE */}
                  <div className="flex flex-col gap-2">
                    <CustomSelect
                      name="customselect"
                      label="Select Country"
                      onChange={(value) => console.log("value", value)}
                      placeholder="select target country"
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
                    <CurSelectAndInput
                      name="fromCurrency"
                      label="From Currency"
                      onChange={(value) => handleChangeFromCurrency(value)}
                      placeholder="amount"
                      countries={data?.data}
                      defaultValue={{amount:FromAmount ,code:FromCode}}
                      value={{amount:ToAmount,code:ToCode}}
                    />
                    <CustomInput
                      label="Sell rate"
                      name="rate"
                      placeholder="rate"
                      value={sellRate}
                      type="text"
                      onChange={(value)=>handleChangeSellRate(value)}
                    />
                    <CurSelectAndInput
                      name="toCurrency"
                      label="To Currency"
                      onChange={(value) => {handleChangeToCurrency(value)}}
                      placeholder="amount"
                      countries={data?.data}
                      defaultValue={{amount:ToAmount,code:ToCode}}
                      value={{amount:ToAmount,code:ToCode}}
                    />

                  </div>
                </div>

                <Button
                  className="w-full mb-[100px] text-white font-light drop-shadow-md !bg-[#2d4da3]"
                  type="submit"
                >
                  Next
                </Button>
              </form>
            </FormProvider>
          </div>
        </>
      )}
      

      <MenuBar />
    </div>
  );
};
export default Remmittance;
