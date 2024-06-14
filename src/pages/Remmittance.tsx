import { useNavigate } from "react-router-dom";
import { useState, useEffect, HTMLProps } from "react";
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
  useGetUserInfoQuery,
  useGetUserListQuery,
  useCreateRemittanceMutation,
  useFileUploadMutation
} from "../services/apiStore";
import CustomSelect from "../components/CustomSelect";
import { AutoComplete, Input, Select, Upload, Checkbox, Modal, Alert, notification, Space } from "antd";
import UploadArea from "../components/UploadArea";
import { IoMdClose } from "react-icons/io";
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Remmittance = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const access_token = localStorage.getItem("access_token");
  const [step, setStep] = useState<string>("step1");
  const { Option } = AutoComplete;
  const [options, setOptions] = useState([]);
  const CountryListData = useGetCountryListQuery(access_token);
  const getUserInfo = useGetUserInfoQuery(access_token)
  const userInfo = getUserInfo?.data?.data
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const CountryListSorted = CountryListData?.data?.data?.slice().sort((a: any, b: any) => a.common_name.localeCompare(b.common_name));
  const CurrencyListData = useGetCurrencyListQuery(access_token);
  const CurrencyListArray = CurrencyListData?.data?.data;
  const [selectFromCurrency, setSelectFromCurrency] = useState<any>()
  const [fromAmount, setFromAmount] = useState<any>()
  const [toAmount, setToAmount] = useState<any>()
  const [selectToCurrency, setSelectToCurrency] = useState<any>()
  const [rate, setRate] = useState<number>()
  const [selectedUser, setSelectedUser] = useState<any>()
  const [userOptions, setUserOptions] = useState([])
  const [uploadedDatas, setUploadDatas] = useState<any>([])
  const [publicBuy, setPublicBuy] = useState()
  const [publicSell, setPublicSell] = useState()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalImgUrl, setModalImgUrl] = useState<string>('')
  const [createRemittance] = useCreateRemittanceMutation();
  const [uploadFile] = useFileUploadMutation();
  const [transactionPurpose, setTransactionPurpose] = useState<string>('')
  const [documentType, setDocumentType] = useState<string>('')
  const [search,setSearch] = useState<string>('')
  const getUsersList = useGetUserListQuery({ token: access_token, search });
    const Users = getUsersList?.data?.data;

  useEffect(() => {
    console.log("searchChange",search);

    if (search && Users ) {
      console.log('Users :>> ', Users);

      const filteredOptions = Users?.filter((item:any) =>
        item?.name?.toUpperCase().includes(search.toUpperCase()) || item?.first_name?.toUpperCase().includes(search.toUpperCase()) || item?.last_name?.toUpperCase().includes(search.toUpperCase())
      );
      setUserOptions(filteredOptions);
    } else {
      setUserOptions([]);
    }
  }, [search, getUsersList]);

  const documentTypeArray: { value: string; label: string }[] = [
    { value: 'bank-statements', label: 'Bank Statements' },
    { value: 'pay-slips', label: 'Pay Slips' },
    { value: 'tax-documents', label: 'Tax Documents' },
    { value: 'property-sale-documents', label: 'Property Sale Documents' },
    { value: 'investment-income-proof', label: 'Investment Income Proof' },
    { value: 'inheritance-documents', label: 'Inheritance Documents' },
    { value: 'business-transaction-documents', label: 'Business Transaction Documents' },
    { value: 'loan-agreements-repayment-proof', label: 'Loan Agreements and Repayment Proof' },
    { value: 'bank-deposit-certificates', label: 'Bank Deposit Certificates' },
    { value: 'identity-address-proof', label: 'Identity and Address Proof' },
    { value: 'other-documents', label: 'Other Special Documents' },
  ];
  const summaryList = [
    {
      title: 'Purpose of transaction',
      value: <p className="font-normal text-gray-500">{transactionPurpose}</p>
    },
    {
      title: 'Public Buy',
      value: <p>{publicBuy}</p>
    },
    {
      title: 'Public Sell',
      value: <p>{publicSell}</p>
    },
    {
      title: 'Exchange Rate',
      value: <p>{rate}</p>
    },
    {
      title: 'You send',
      value: <p>{fromAmount} {selectFromCurrency?.currency?.symbol}</p>
    },
    {
      title: 'Total to Recieve',
      value: <p className="font-normal text-orange-300">{toAmount} {selectToCurrency?.currency?.symbol}</p>
    }
  ]
  const purpose: { value: string; label: string }[] = [
    { value: 'family-support', label: 'Family Support' },
    { value: 'education-expenses', label: 'Educational Expenses' },
    { value: 'medical-expenses', label: 'Medical Expenses' },
    { value: 'investment-savings', label: 'Investment and Savings' },
    { value: 'social-cultural', label: 'Social and Cultural Obligations' },
    { value: 'debt-repayment', label: 'Debt Repayment' },
    { value: 'charity', label: 'Charitable Donations' },
  ];

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

  const handleSelectFromCurrency = (id: string) => {
    const searchSelectFromCurrency = CurrencyListArray.find((item: any) => item.id === id)
    searchSelectFromCurrency && setSelectFromCurrency(searchSelectFromCurrency)
    const public_sell = selectToCurrency?.public_sell
    const public_buy = searchSelectFromCurrency?.public_buy
    const calRate = public_sell / public_buy
    selectToCurrency && setRate(calRate)
    toAmount && setToAmount(fromAmount * calRate)
    setPublicBuy(public_buy)
  }

  const handleSelectToCurrency = (id: string) => {
    const searchSelecToCurrency = CurrencyListArray.find((item: any) => item.id === id)
    searchSelecToCurrency && setSelectToCurrency(searchSelecToCurrency)
    const public_sell = searchSelecToCurrency.public_sell
    const public_buy = selectFromCurrency?.public_buy
    const calRate = public_sell / public_buy
    selectFromCurrency && setRate(calRate)
    fromAmount && setToAmount(fromAmount * calRate)
    setPublicSell(public_sell)
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

  const openNotificationWithIcon = (type: NotificationType, text: string) => {
    notification[type]({
      message: 'Notification',
      description: text
    });
  };

  const handleNextStep = (step: string) => {
    switch (step) {
      case 'step2':
        if (!toAmount || !fromAmount || !selectedCountry || !selectToCurrency || !selectFromCurrency) {
          openNotificationWithIcon('warning', "Please fill the data")
        } else {
          setStep(step)
        }
        break
      case 'step3':
        if (!selectedUser) {
          openNotificationWithIcon('warning', "Please fill the data")
        } else {
          setStep(step)
        }
        break

    }
  }

  const handleUserSearch =async (value: any) => {
    setSearch(value);

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

  const handleCreateRemittance = async () => {
    let prepareData = {
      "destination_country_id": selectedCountry?.id,
      "department_id": parseInt(import.meta.env.VITE_DEPARTMENT_ID),
      "entity_id": selectedUser?.id,
      "entity_address_id": 484,
      "sale_user_id": userInfo?.id,
      "kyc_screen": 0,
      "purpose_of_transfer": transactionPurpose,
      "process_fee": {
        "enable": 0,
        "fees": []
      },
      "items": [
        {
          "source_currency_id": selectFromCurrency?.currency_id,
          "target_currency_id": selectToCurrency?.currency_id,
          "amount": parseFloat(fromAmount),
          "exchange_rate": rate,
          "calculation_amount": toAmount
        }
      ],
      'files': uploadedDatas.map((item:any)=> {return {'file_id':item?.id,'file_type':documentType}})

    }
    console.log("prepareData", prepareData);
    const res = await createRemittance({ data: prepareData, token: access_token })
    console.log("res", res);
    if (res.data) {
      openNotificationWithIcon('success', "create remittance done!")
    } else {
      openNotificationWithIcon('error', "something wrong!")
    }

  }

  return (
    <div className="flex flex-col  justify-start h-[100vh] content-around  items-center drop-shadow-md ">
      {showModal && <Modal width={'80vw'} footer={null} open={showModal} onClose={() => setShowModal(!showModal)} closable onCancel={() => setShowModal(!showModal)}>
        <img src={modalImgUrl} />
      </Modal>}

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
                {selectedCountry &&
                  <div className="bg-white h-28 w-full shadow-lg rounded-2xl p-2 max-w-[430px]">
                    <div className="flex flex-col relative h-full">
                      <IoMdClose className="hover:text-red-500 text-gray-500 absolute right-2  top-2 cursor-pointer" onClick={() => setSelectedCountry(null)} />
                      <div className="flex flex-row justify-start items-center  gap-4 h-full w-full ml-3 ">

                        <img src={selectedCountry?.flag} className="h-14 w-14 rounded-full" />
                        <div className="flex flex-col text-gray-500">
                          <p className="text text-[#2d4da3]">{selectedCountry?.common_name}</p>
                          <p className="text-sm">{selectedCountry?.region}</p>
                        </div>
                        <div className="w-full text-right text-gray-500 mr-10"><p className="text-xs text-gray-400"></p>{selectedCountry?.currency_code}</div>
                      </div>
                    </div>
                  </div> ||
                  <AutoComplete
                    onSelect={onCountrySelect}
                    onSearch={handleCountrySearch}
                    placeholder="Search countries"
                    className="!w-full h-14"
                    defaultOpen
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
                }

                <p className="font-thin text-gray-500">From Currency</p>
                <div className="flex">
                  <Select className="select-currency w-[40%] h-14 self-center" placeholder='Currency' onSelect={handleSelectFromCurrency}>
                    {CurrencyListArray?.map((item: any) => (
                      <Select.Option key={item?.id} value={item?.id}>
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
                      <Select.Option key={item?.id} value={item?.id}>
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
                        <p className="text text-[#2d4da3]">{selectedUser?.name || `${selectedUser.first_name} ${selectedUser.last_name}`}</p>
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
                  <Option key={item?.name || item.first_name} value={item?.id}>
                    <div className="flex gap-2">
                      <img src={item.avatar_url} className="w-6 h-6 rounded-full" />
                      <p>{item?.name || item?.first_name}</p>
                    </div>
                  </Option>
                ))}
              </AutoComplete>}

              <p className="font-thin text-gray-500">Transaciton Purpose</p>
              <Select className="h-12" placeholder="Select Purpose" options={purpose} onChange={(value) => setTransactionPurpose(value)} />

              <p className="font-thin text-gray-500">Document Type</p>
              <Select
                className="h-12 mb-3"
                placeholder="Select Document Type"
                options={documentTypeArray}
                onChange={(value) => setDocumentType(value)}
              />
              <UploadArea token={access_token || ''} onUploadSuccess={handleUploadSuccess} department_id={userInfo?.entity?.department_id} />
              <div className="grid grid-cols-2 gap-2">
                {uploadedDatas?.map((data: any, index: number) => {
                  return (
                    <div className="bg-white p-3 shadow-md w-full relative hover:bg-slate-100 cursor-pointer" >
                      <IoMdClose className="hover:text-red-500 text-gray-500 absolute right-2  top-2 cursor-pointer" onClick={() => {
                        handleRemoveData(index)
                      }} />

                      <p className="text-gray-500 text-sm m-2 font-light">{data.original_client_name}</p>
                      {(data.mime_type == "image/png" || data.mime_type == "image/jpg") && <img src={data.url} onClick={() => { setModalImgUrl(data.url); setShowModal(true) }} />}
                    </div>
                  )
                })}
              </div>
            </div>
            <Button
              className="w-full mb-[100px] text-white font-light drop-shadow-md !bg-[#2d4da3]"
              onClick={() => handleNextStep("step3")}
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
              <p className="font-thin text-gray-500">Selected custormer</p>
              {selectedUser &&
                <div className="bg-white h-28 w-full shadow-lg rounded-2xl p-2 max-w-[430px]">
                  <div className="flex flex-col relative h-full">
                    <div className="flex flex-row justify-start items-center  gap-4 h-full w-full ml-3 ">

                      <img src={selectedUser?.avatar_url} className="h-14 w-14 rounded-full" />
                      <div className="flex flex-col text-gray-500">
                        <p className="text text-[#2d4da3]">{selectedUser?.name || `${selectedUser.first_name} ${selectedUser.last_name}`}</p>
                        <p className="text-sm">{selectedUser?.email}</p>
                      </div>
                      <div className="w-full text-right text-gray-500 mr-10"><p className="text-xs text-gray-400">language:</p>{selectedUser?.language}</div>
                    </div>
                  </div>
                </div>}              <div className="flex flex-cols gap-2 w-full">
                
              </div>

              {summaryList.map((list: any) => {
                return (
                  <div className="">
                    <div className="flex flex-cols justify-between">
                      <p className="font-thin text-gray-500">
                        {list?.title}
                      </p>
                      {list?.value}
                    </div>

                    <hr className="m-1 w-full" />

                  </div>
                )
              })}
              <p className=" text-gray-500 font-medium">Transaction file</p>
              {uploadedDatas?.map((data: any, index: number) => {
                return (
                  <>
                    <div className="bg-white p-3 shadow-md w-full relative hover:bg-slate-100 cursor-pointer" onClick={() => { setModalImgUrl(data.url); setShowModal(true) }}>
                      <IoMdClose className="hover:text-red-500 text-gray-500 absolute right-2  top-2 cursor-pointer" onClick={() => {
                        handleRemoveData(index)
                      }} />

                      <p className="text-gray-500 text-sm m-2 font-light">{data.original_client_name}</p>
                      {(data.mime_type == "image/png" || data.mime_type == "image/jpg") && <img src={data.url} />}
                    </div>
                  </>

                )
              })}
            </div>

            <Button
              onClick={() => handleCreateRemittance()}
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
