import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MenuBar from "../components/MenuBar";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ProfileSection from "./ProfileSection";
import "../components/components.css";
import Button from "../components/Button";
import { MdPeopleAlt } from "react-icons/md";
import draftProfile from '../assets/draftProfile.png'
import {
  useGetCountryListQuery,
  useGetCurrencyListQuery,
  useGetUserInfoQuery,
  useGetUserListQuery,
  useCreateRemittanceMutation,
} from "../services/apiStore";
import Input from "../components/Input";
import { AutoComplete, Select, Modal, notification } from "antd";
import UploadArea from "../components/UploadArea";
import { IoMdClose } from "react-icons/io";
import InputSelect from "../components/InputSelect";
import SearchSelect from "../components/SearchSelect";
import AddEntityModal from "../components/AddEntityModal";
type NotificationType = 'success' | 'info' | 'warning' | 'error';
const Remmittance = () => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const [step, setStep] = useState<string>("step1");
  const { Option } = AutoComplete;
  const [options, setOptions] = useState<[]>([]);
  const CountryListData = useGetCountryListQuery(access_token);
  const getUserInfo = useGetUserInfoQuery(access_token)
  const userInfo = getUserInfo?.data?.data
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const CountryListSorted = CountryListData?.data?.data?.slice().sort((a: any, b: any) => a.common_name.localeCompare(b.common_name));
  const CurrencyListData = useGetCurrencyListQuery(access_token);
  const CurrencyListArray = CurrencyListData?.data?.data;
  const [selectFromCurrency, setSelectFromCurrency] = useState<any>()
  const [fromAmount, setFromAmount] = useState<number>()
  const [toAmount, setToAmount] = useState<number>()
  const [selectToCurrency, setSelectToCurrency] = useState<any>()
  const [rate, setRate] = useState<number>()
  const [selectedUser, setSelectedUser] = useState<any | undefined>()
  const [userOptions, setUserOptions] = useState<[]>([])
  const [uploadedDatas, setUploadDatas] = useState<any>([])
  const [publicBuy, setPublicBuy] = useState<number | null>()
  const [publicSell, setPublicSell] = useState<number | null>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalImgUrl, setModalImgUrl] = useState<string>('')
  const [createRemittance] = useCreateRemittanceMutation();
  const [transactionPurpose, setTransactionPurpose] = useState<string>('')
  const [documentType, setDocumentType] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [costRate, setCostRate] = useState<number | undefined>()
  const getUsersList = useGetUserListQuery({ token: access_token, search });
  const [showSelectUsers, setShowSelectUsers] = useState<boolean>(false)
  const [showAddEntity, setShowAddEntity] = useState<boolean>(false)
  const Users = getUsersList?.data?.data;
  const savedEntity = localStorage.getItem('savedEntity') ? JSON.parse(localStorage.getItem('savedEntity') || '') : []

  useEffect(() => {
    if (search && Users) {
      const filteredOptions = Users && Users?.filter((item: any) =>
        item?.name?.toUpperCase().includes(search.toUpperCase()) || item?.first_name?.toUpperCase().includes(search.toUpperCase()) || item?.last_name?.toUpperCase().includes(search.toUpperCase())
      ) || []
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
      title: 'Cost rate',
      value: <p>{costRate || '-'}</p>
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

  const handleCountrySearch = (value: string) => {
    const filteredOptions = CountryListSorted && CountryListSorted.filter((item: any) =>
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
    fromAmount && toAmount && setToAmount(fromAmount * calRate)
    setPublicBuy(public_buy)
  }

  const handleSelectToCurrency = (id: string) => {
    const searchSelectToCurrency = CurrencyListArray.find((item: any) => item.id === id)
    searchSelectToCurrency && setSelectToCurrency(searchSelectToCurrency)
    const public_sell = searchSelectToCurrency.public_sell
    const public_buy = selectFromCurrency?.public_buy
    const calRate = public_sell / public_buy
    selectFromCurrency && setRate(calRate)
    fromAmount && setToAmount(fromAmount * calRate)
    setPublicSell(public_sell)
  }
  useEffect(()=>{console.log(uploadedDatas)},[uploadedDatas])
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

  const handleChangeRate = (value: React.ChangeEvent<HTMLInputElement>) => {
    const rateValue: number = parseFloat(value.target.value)
    setRate(rateValue)
    fromAmount && setToAmount(rateValue * fromAmount)
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

  const handleUserSearch = async (value: string) => {
    setSearch(value);
  };

  const handleRemoveData = (index: number) => {
    const newUploadedDatas = [...uploadedDatas];
    newUploadedDatas.splice(index, 1); // Remove the element at the specified index
    setUploadDatas(newUploadedDatas);
  };

  const onUserSelect = (value: any) => {
    const selectedOption = Users?.find(
      (item: any) => item.id == value
    );
    selectedOption && setSelectedUser(selectedOption);
    let savedEntity = localStorage.getItem('savedEntity');
    let itemsArray = savedEntity ? JSON.parse(savedEntity) : [];
    if (!itemsArray.includes(selectedOption)) {
      itemsArray.push(selectedOption);
    }
    localStorage.setItem('savedEntity', JSON.stringify(itemsArray));
  };

  const handleUploadSuccess = (data: any) => {
    setUploadDatas([...uploadedDatas, data?.data?.data])
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
          "amount": fromAmount,
          "exchange_rate": rate,
          "calculation_amount": toAmount,
          "cost_rate": costRate
        }
      ],
      'files': uploadedDatas.map((item: any) => { return { 'file_id': item?.id, 'file_type': documentType } })

    }
    const res = await createRemittance({ data: prepareData, token: access_token })
    if (res.data) {
      openNotificationWithIcon('success', "create remittance done!")
      navigate('/home')
    } else {
      openNotificationWithIcon('error', "something wrong!")
    }

  }
  const onDeselectCountry = () => {
    setSelectedCountry(null)
  }
  return (
    <div className="flex flex-col  justify-start h-[100vh] content-around  items-center drop-shadow-md ">
      {showModal && <Modal width={'80vw'} footer={null} open={showModal} onClose={() => setShowModal(!showModal)} closable onCancel={() => setShowModal(!showModal)}>
        <img src={modalImgUrl} />
      </Modal>}
      {showSelectUsers && <Modal width={'95vw'} footer={null} open={showSelectUsers} closable onCancel={() => setShowSelectUsers(!showSelectUsers)}>
        <div className="h-[70vh] flex flex-col justify-between">
          <div>
            <p className="font-thin text-gray-500 mb-2">Select Costomer</p>

            <SearchSelect
              placeholder="Username or email"
              onSelect={onUserSelect}
              onSearch={handleUserSearch}
              value={selectedUser}
              onClose={() => setSelectedUser(null)}
              selectCard={
                {
                  imageUrl: selectedUser?.avatar_url,
                  title: selectedUser?.name || `${selectedUser?.first_name} ${selectedUser?.middle_name} ${selectedUser?.last_name}`,
                  subtitle: selectedUser?.entity_type,
                  rightText: selectedUser?.language
                }
              }
            >
              {userOptions.map((item: any) => (
                <Option key={item?.name || item.first_name} value={(item?.id).toString()}>
                  <div className="flex gap-2">
                    <img src={item.avatar_url || draftProfile} className="w-6 h-6 rounded-full" />
                    <p>{item?.name || item?.first_name}</p>
                  </div>
                </Option>
              ))}
            </SearchSelect>
            <p className="my-2 text-gray-400">Recent Users</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {savedEntity.slice(0,4).map((entity:any)=>{return(
        
                <div key={entity?.id} className="bg-white w-full shadow-lg p-2 h-20 hover:bg-slate-100 cursor-pointer" onClick={()=>setSelectedUser(entity)}>
                  <div className="flex flex-col relative h-full">
                    <div className="flex flex-row justify-start items-center  gap-4 h-full w-full ml-3 ">

                      <img src={entity?.avatar_url || draftProfile} className="h-5 w-5 rounded-full" />
                      <div className="flex flex-col text-gray-500">
                        <p className="text text-gray-600 !w-full">
                          {entity?.first_name || entity?.middle_name || entity?.last_name
                            ? `${entity?.first_name || ''} ${entity?.middle_name || ''} ${entity?.last_name || ''}`.trim()
                            : entity?.name}
                        </p>
                        <p className="text-xs">{entity?.entity_type}</p>
                      </div>
                      {/* <div className="w-full text-right text-gray-500 mr-10"><p className="text-xs text-gray-400">language:</p>{selectedUser?.language}</div> */}
                    </div>
                  </div>
                </div>
          )})}
          </div>
          </div>
       

          <div className="flex justify-between mt-4">
            <Button onClick={() => setShowAddEntity(true)} className="!bg-white border" >add entities</Button>

            <Button onClick={() => setShowSelectUsers(false)} className="!bg-[#2d4da3] text-white">Save</Button>
          </div>
        </div>


      </Modal>}

      <AddEntityModal open={showAddEntity} onCancel={() => setShowAddEntity(!showAddEntity)} />

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

                <SearchSelect
                  onSelect={onCountrySelect}
                  onSearch={handleCountrySearch}
                  value={selectedCountry}
                  onClose={onDeselectCountry}
                  placeholder="Destination Country"
                  selectCard={
                    {
                      imageUrl: selectedCountry?.flag,
                      title: selectedCountry?.common_name,
                      subtitle: selectedCountry?.region,
                      rightText: selectedCountry?.currency_code
                    }
                  }
                >
                  {options?.map((item: any) => (
                    <Option key={item.id} value={item?.common_name}>
                      <div className="flex gap-2">
                        <img src={item.flag} className="w-6 h-6 rounded-full" />
                        <p>{item.common_name}</p>
                      </div>
                    </Option>
                  ))}
                </SearchSelect>
                <InputSelect inputClassName="!text-[#56AEF5]" label="From Currency" onChangeInput={handleChangeFromAmount} inputValue={fromAmount} inputPlaceHolder="From Amount" selectPlaceHolder="currency" onSelect={handleSelectFromCurrency} selectValue={selectFromCurrency?.id}>
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
                </InputSelect>

                <Input
                  label='Rate'
                  theme='border'
                  className="text-center !text-[#56AEF5] font-normal text-xl"
                  placeholder="rate"
                  type="number"
                  onChange={handleChangeRate}
                  value={rate}
                />

                <InputSelect inputClassName="!text-[#F5AC56]" label="To Currency" onChangeInput={handleChangeToAmount} inputPlaceHolder="From Amount" selectPlaceHolder="currency" inputValue={toAmount} onSelect={handleSelectToCurrency} selectValue={selectToCurrency?.id}>
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
                </InputSelect>
                <p className="font-thin text-gray-500 ">Cost rate</p>
                <Input
                  theme='border'
                  className="text-center !text-[#56AEF5] font-normal text-xl"
                  placeholder="cost rate"
                  type="number"
                  onChange={(e) => setCostRate(parseFloat(e.target.value))}
                  value={costRate}
                />

              </div>
            </div>
            <Button
              className="w-full mb-[100px] text-white font-light drop-shadow-md !bg-[#2d4da3]"
              onClick={() => handleNextStep('step2')}
            >
              <IoChevronForward className="self-center w-full text-3xl" />
            </Button>
          </div>
        </>
      )}
      {step == "step2" && (
        <>
          <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7 ">
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
          <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col gap-5 justify-between rounded-b-none min-h-screen pb-[100px]">
            <div className="flex flex-col gap-3">
              <p className="font-thin text-gray-500 flex gap-2">Select custormer <MdPeopleAlt className="self-center text-lg" />
              </p>
              {/*  */}
              {!selectedUser && <Button onClick={() => setShowSelectUsers(true)} className="!text-xs !bg-[#2d4da3] text-white !w-[30%] flex gap-2 justify-center">Select</Button>}
              {selectedUser && <div className="bg-white h-28 w-full shadow-lg rounded-2xl p-2 max-w-[430px] self-center">
                <div className="flex flex-col relative h-full">
                  <IoMdClose className="hover:text-red-500 text-gray-500 absolute right-2  top-2 cursor-pointer" onClick={() => setSelectedUser(undefined)} />
                  <div className="flex flex-row justify-start items-center  gap-4 h-full w-full ml-3 ">

                    <img src={selectedUser?.imageUrl || draftProfile} className="h-[70%] aspect-square rounded-full" />
                    <div className="flex flex-col text-gray-500 !w-full">
                      <p className="text text-[#2d4da3] !w-full">
                        {selectedUser?.first_name || selectedUser?.middle_name || selectedUser?.last_name
                          ? `${selectedUser?.first_name || ''} ${selectedUser?.middle_name || ''} ${selectedUser?.last_name || ''}`.trim()
                          : selectedUser?.name}
                      </p>
                      <p className="text-sm">{selectedUser?.entity_type}</p>
                    </div>
                    <div className="w-full text-right text-gray-500 mr-10"><p className="text-xs text-gray-400"></p>{selectedUser?.rightText}</div>
                  </div>
                </div>
              </div>
              }

              <p className="font-thin text-gray-500">Transaciton Purpose</p>
              <Select className="h-12" value={transactionPurpose || undefined} placeholder="Select Purpose" options={purpose} onChange={(value) => setTransactionPurpose(value)} />

              <p className="font-thin text-gray-500">Document Type</p>
              <Select
                value={documentType || undefined}
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
                      {data?.mime_type.includes('image') && <img src={data.url} onClick={() => { setModalImgUrl(data.url); setShowModal(true) }} />}
                    </div>
                  )
                })}
              </div>
            </div>
            <Button
              className="w-full mb-[100px]  text-white font-light drop-shadow-md !bg-[#2d4da3] h-15"
              onClick={() => handleNextStep("step3")}
            >
              <IoChevronForward className="self-center w-full text-3xl" />
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
          <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col gap-5 justify-between rounded-b-none min-h-screen">
            <div className="flex flex-col gap-2">
              <p className="font-thin text-gray-500">Selected custormer</p>
              {selectedUser &&
                <div className="bg-white h-28 w-full shadow-lg rounded-2xl p-2 max-w-[430px]">
                  <div className="flex flex-col relative h-full">
                    <div className="flex flex-row justify-start items-center  gap-4 h-full w-full ml-3 ">

                      <img src={selectedUser?.avatar_url || draftProfile} className="h-14 w-14 rounded-full" />
                      <div className="flex flex-col text-gray-500">
                        <p className="text text-[#2d4da3] !w-full">
                          {selectedUser?.first_name || selectedUser?.middle_name || selectedUser?.last_name
                            ? `${selectedUser?.first_name || ''} ${selectedUser?.middle_name || ''} ${selectedUser?.last_name || ''}`.trim()
                            : selectedUser?.name}
                        </p>
                        <p className="text-sm">{selectedUser?.entity_type}</p>
                      </div>
                      {/* <div className="w-full text-right text-gray-500 mr-10"><p className="text-xs text-gray-400">language:</p>{selectedUser?.language}</div> */}
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
              <div className="grid grid-cols-2 gap-2">

                {uploadedDatas?.map((data: any, index: number) => {
                  return (
                    <>
                      <div className="bg-white p-3 shadow-md w-full relative hover:bg-slate-100 cursor-pointer" onClick={() => { setModalImgUrl(data.url); setShowModal(true) }}>
                        <IoMdClose className="hover:text-red-500 text-gray-500 absolute right-2  top-2 cursor-pointer" onClick={() => {
                          handleRemoveData(index)
                        }} />

                        <p className="text-gray-500 text-sm m-2 font-light">{data.original_client_name}</p>
                        {data?.mime_type.includes('image') && <img src={data.url} />}
                      </div>
                    </>

                  )
                })}</div>
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
