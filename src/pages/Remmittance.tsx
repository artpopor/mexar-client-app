import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuBar from "../components/MenuBar";
import { IoChevronBack } from "react-icons/io5";
import ProfileSection from "./ProfileSection";
import "../components/components.css";
import React from "react";
import type { DefaultOptionType } from "antd/es/select";
import Button from "../components/Button";
import {
  useGetCountryListQuery,
  useGetCurrencyListQuery,
  useGetUserListQuery,
} from "../services/jsonServerApi";
import CustomSelect from "../components/CustomSelect";
import { AutoComplete, Input, Select, Upload, Checkbox } from "antd";
import UploadArea from "../components/UploadArea";
import { IoMdClose } from "react-icons/io";

const Remmittance = () => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const [step, setStep] = useState<string>("step1");
  const { Option } = AutoComplete;
  const [options, setOptions] = useState([]);
  const CountryListData = useGetCountryListQuery(access_token);
  const [selectedCountry, setSelectedCountry] = useState({});
  const CountryListSorted = CountryListData?.data?.data?.slice().sort((a: any, b: any) => a.common_name.localeCompare(b.common_name));
  const CurrencyListData = useGetCurrencyListQuery(access_token);
  const CurrencyListArray = CurrencyListData?.data?.data;
  const [selectFromCurrency, setSelectFromCurrency] = useState<any>()
  const [fromAmount, setFromAmount] = useState<any>()
  const [toAmount, setToAmount] = useState<any>()
  const [selectToCurrency, setSelectToCurrency] = useState<any>()
  const [rate, setRate] = useState<number>()
  const getUsersList = useGetUserListQuery(access_token)
  const Users = getUsersList?.data?.data
  const [selectedUser, setSelectedUser] = useState<any>()
  const [userOptions, setUserOptions] = useState([])
  const [uploadedDatas, setUploadDatas] = useState<any>([])
  const handleCountrySearch = (value: any) => {
    const filteredOptions = CountryListSorted.filter((item: any) =>
      item.common_name.toUpperCase().startsWith(value.toUpperCase())
    );
    setOptions(filteredOptions);
  };

  const onCountrySelect = (value: any) => {
    const selectedOption = CountryListSorted.find(
      (item: any) => item.common_name === value
    );
    selectedOption && setSelectedCountry(selectedOption);
  };

  const handleSelectFromCurrency = (currency_id: string) => {
    const searchSelectFromCurrency = CurrencyListArray.find((item: any) => item.currency_id === currency_id)
    searchSelectFromCurrency && setSelectFromCurrency(searchSelectFromCurrency)
    const public_sell = selectToCurrency?.public_sell
    const public_buy = searchSelectFromCurrency?.public_buy
    const calRate = public_sell * public_buy
    selectToCurrency && setRate(calRate)
  }

  const handleSelectToCurrency = (currency_id: string) => {
    const searchSelecToCurrency = CurrencyListArray.find((item: any) => item.currency_id === currency_id)
    searchSelecToCurrency && setSelectToCurrency(searchSelecToCurrency)
    const public_sell = searchSelecToCurrency.public_sell
    const public_buy = selectFromCurrency?.public_buy
    const calRate = public_sell / public_buy
    selectFromCurrency && setRate(calRate)
    fromAmount && setToAmount(fromAmount / calRate)
  }

  const handleChangeFromAmount = (amount: any) => {
    amount = amount.target.value
    setFromAmount(amount)
    rate && amount && setToAmount(rate * amount)
  }

  const handleChangeToAmount = (amount: any) => {
    amount = amount.target.value
    setToAmount(amount)
    rate && amount && setFromAmount(amount / rate)


  }

  const handleChangeRate = (value: any) => {
    const rateValue = value.target.value
    setRate(rateValue)
    setToAmount(rateValue * fromAmount)
  }

  const handleNextStep = (step: string) => {
    setStep(step)
  }

  const handleUserSearch = (value: any) => {
    const filteredOptions = Users?.filter((item: any) =>
      item.username.toUpperCase().startsWith(value.toUpperCase()) || item.email.toUpperCase().startsWith(value.toUpperCase())
    );
    setUserOptions(filteredOptions);
  };

  const handleRemoveData = (index: number) => {
    const newUploadedDatas = [...uploadedDatas];
    newUploadedDatas.splice(index, 1); // Remove the element at the specified index
    setUploadDatas(newUploadedDatas);
  };

  const onUserSelect = (value: any) => {
    console.log(value);
    const selectedOption = Users?.find(
      (item: any) => item.id == value
    );
    selectedOption && setSelectedUser(selectedOption);
  };
  
  const handleUploadSuccess = (data: any) => {

    setUploadDatas([...uploadedDatas, data?.data?.data])
    console.log(data.data.data);
  };
  return (
    <div className="flex flex-col  justify-start h-[100vh] content-around  items-center drop-shadow-md ">
      {step == "step1" && (
        <>
          <div className="flex flex-cols content-center text-center justify-between w-full  px-4 mt-7">
            <div
              onClick={() => navigate("/home")}
              className="text-white text-xl flex flex-cols gap-3 cursor-pointer "
            >
              <IoChevronBack className="text-xl self-center" />
              <p className="self-center">Back</p>
            </div>
            <ProfileSection />
          </div>
          <p
            className="text-white text-start w-full mt-2 px-4 text-2xl md:w-[80vw]"
            aria-placeholder="hello"
          >
            01 - Enter order Detail
          </p>
          <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl  h-full flex flex-col gap-5 justify-between rounded-b-none">
            <div className="flex flex-col justify-between content-between h-full">
              {/*CONTENT START HERE */}
              <div className="flex flex-col gap-2">
                <p className="font-thin text-gray-500">Destination Country</p>
                <AutoComplete
                  onSelect={onCountrySelect}
                  onSearch={handleCountrySearch}
                  placeholder="Search countries"
                  className="!w-full h-14"
                >
                  {options.map((item: any) => (
                    <Option key={item.id} value={item?.common_name}>
                      <div className="flex gap-2">
                        <img src={item.flag} className="w-6 h-6 rounded-full" />
                        <p>{item.common_name}</p>
                      </div>
                    </Option>
                  ))}
                </AutoComplete>
                <p className="font-thin text-gray-500">From Currency</p>
                <div className="flex">
                  <Select className="select-currency w-[40%] h-14 self-center" placeholder='Currency' onSelect={handleSelectFromCurrency}>
                    {CurrencyListArray?.map((item: any) => (
                      <Select.Option key={item?.currency.code} value={item.currency_id}>
                        <div className="flex flex-cols gap-2 justify-center content-center self-center">
                          <p>{item.currency.code}</p>
                          <img
                            className="rounded-md w-5 h-5 self-center"
                            src={item.currency.flag}
                          />
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                  <input
                    className="w-full border rounded-xl rounded-l-none p-4 h-14"
                    placeholder="From amount"
                    type="number"
                    value={fromAmount}
                    onChange={handleChangeFromAmount}
                  />
                </div>
                <p className="font-thin text-gray-500">Rate</p>
                <input
                  className="w-full border rounded-xl p-4 h-14 text-center"
                  placeholder="Enter rate"
                  type="number"
                  onChange={handleChangeRate}
                  value={rate}
                />
                <p className="font-thin text-gray-500">To Currency</p>
                <div className="flex">
                  <Select className="select-currency w-[40%] h-14 self-center" placeholder='Currency' onSelect={handleSelectToCurrency}>
                    {CurrencyListArray?.map((item: any) => (
                      <Select.Option key={item?.currency.code} value={item.currency_id}>
                        <div className="flex flex-cols gap-2 justify-center content-center self-center">
                          <p>{item.currency.code}</p>
                          <img
                            className="rounded-md w-5 h-5 self-center"
                            src={item.currency.flag}
                          />
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                  <input
                    className="w-full border rounded-xl rounded-l-none p-4 h-14"
                    placeholder="To amount"
                    type="number"
                    value={toAmount}
                    onChange={handleChangeToAmount}
                  />
                </div>
              </div>
            </div>
            <Button
              className="w-full mb-[100px] text-white font-light drop-shadow-md !bg-[#2d4da3]"
              onClick={() => handleNextStep('step2')}
            >
              Next
            </Button>
          </div>
        </>
      )}
      {step == "step2" && (
        <>
          <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
            <div
              onClick={() => setStep("step1")}
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
              {/*  */}
              {selectedUser &&
                <div className="bg-white h-28 w-full shadow-lg rounded-2xl p-2 max-w-[430px]">
                  <div className="flex flex-col relative h-full">
                    <IoMdClose className="hover:text-red-500 text-gray-500 absolute right-2  top-2 cursor-pointer" onClick={() => setSelectedUser(null)} />
                    <div className="flex flex-row justify-start items-center  gap-4 h-full w-full ml-3 ">

                      <img src={selectedUser?.avatar_url} className="h-14 w-14 rounded-full" />
                      <div className="flex flex-col text-gray-500">
                        <p className="text text-[#2d4da3]">{selectedUser?.username}</p>
                        <p className="text-sm">{selectedUser?.email}</p>
                      </div>
                      <div className="w-full text-right text-gray-500 mr-10"><p className="text-xs text-gray-400">language:</p>{selectedUser?.language}</div>
                    </div>
                  </div>
                </div>}
              {!selectedUser && <AutoComplete
                onSelect={onUserSelect}
                onSearch={handleUserSearch}
                placeholder="Username or email"
                className="!w-full h-14"
              >
                {userOptions.map((item: any) => (
                  <Option key={item?.username} value={item?.id}>
                    <div className="flex gap-2">
                      <img src={item.avatar_url} className="w-6 h-6 rounded-full" />
                      <p>{item.username}</p>
                    </div>
                  </Option>
                ))}
              </AutoComplete>}
              {/*  */}
              <div className="flex flex-cols gap-2 w-full">
                <Checkbox />
                <p className="font-thin text-gray-500 text-sm">
                  Select and Recieve account
                </p>
              </div>
              <p className="font-thin text-gray-500">Transaciton Purpose</p>
              <Select className="h-12" placeholder="Select Purpose" />

              <p className="font-thin text-gray-500">Document Type</p>
              <Select
                className="h-12 mb-3"
                placeholder="Select Document Type"
              />
              <UploadArea token={access_token || ''} onUploadSuccess={handleUploadSuccess} />
              <div className="grid grid-cols-2 gap-2">
                {uploadedDatas.map((data: any, index: number) => {
                  return (
                    <div className="bg-white p-3 shadow-md w-full relative">
                      <IoMdClose className="hover:text-red-500 text-gray-500 absolute right-2  top-2 cursor-pointer" onClick={() => {
                        handleRemoveData(index)
                      }} />

                      <p className="text-gray-500 text-sm m-2 font-light">{data.original_client_name}</p>
                      {(data.mime_type == "image/png" || data.mime_type == "image/jpg") && <img src={data.url} />}
                    </div>
                  )
                })}
              </div>
            </div>
            <Button
              className="w-full mb-[100px] text-white font-light drop-shadow-md !bg-[#2d4da3]"
              onClick={() => setStep("step3")}
            >
              Next
            </Button>
          </div>
        </>
      )}
       {step == "step3" && (
        <>
          <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
            <div
              onClick={() => setStep("step2")}
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
              {selectedUser &&
                <div className="bg-white h-28 w-full shadow-lg rounded-2xl p-2 max-w-[430px]">
                  <div className="flex flex-col relative h-full">
                    <div className="flex flex-row justify-start items-center  gap-4 h-full w-full ml-3 ">

                      <img src={selectedUser?.avatar_url} className="h-14 w-14 rounded-full" />
                      <div className="flex flex-col text-gray-500">
                        <p className="text text-[#2d4da3]">{selectedUser?.username}</p>
                        <p className="text-sm">{selectedUser?.email}</p>
                      </div>
                      <div className="w-full text-right text-gray-500 mr-10"><p className="text-xs text-gray-400">language:</p>{selectedUser?.language}</div>
                    </div>
                  </div>
                </div>}              <div className="flex flex-cols gap-2 w-full">
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
              {uploadedDatas.map((data: any, index: number) => {
                  return (
                    <div className="bg-white p-3 shadow-md w-full relative">
                      <IoMdClose className="hover:text-red-500 text-gray-500 absolute right-2  top-2 cursor-pointer" onClick={() => {
                        handleRemoveData(index)
                      }} />

                      <p className="text-gray-500 text-sm m-2 font-light">{data.original_client_name}</p>
                      {(data.mime_type == "image/png" || data.mime_type == "image/jpg") && <img src={data.url} />}
                    </div>
                  )
                })}
            </div>

            <Button
              className="w-full mb-[100px] text-white font-light drop-shadow-md !bg-[#2d4da3]"
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
