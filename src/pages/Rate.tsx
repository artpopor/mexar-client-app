import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import MenuBar from "../components/MenuBar";
import { useGetCurrencyListQuery } from "../services/apiStore";
import ProfileSection from "./ProfileSection";
import SearchSelect from "../components/SearchSelect";
import { AutoComplete } from "antd";
import Input from "../components/Input";

const Rate = () => {
  const navigate = useNavigate();
  const { Option } = AutoComplete;
  // const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const access_token = localStorage.getItem("access_token");
  const CurrencyListData = useGetCurrencyListQuery(access_token);
  const CurrencyListArray = CurrencyListData?.data?.data;
  const [toCurrency,setToCurrency]= useState<any>()
  const [fromCurrency,setFromCurrency]= useState<any>()
  const [fromOptions, setFromOptions] = useState<[]>([]);
  const [toOptions,setToOptions] = useState<[]>([]);
  const [rate,setRate] = useState<number | null>(null)
  const [fromAmount,setFromAmount] = useState<number>()
  const [toAmount,setToAmount] = useState<number>()

  useEffect(()=>{
    const sellRate = parseFloat(toCurrency?.public_sell)
    const buyRate = parseFloat(fromCurrency?.public_buy)
    const calRate = sellRate/buyRate
    setRate(calRate)
    fromAmount && setToAmount(fromAmount * calRate)
  },[fromCurrency,toCurrency,toAmount,fromAmount])
  const List = ({ title, data }: {title:string,data:any}) => {
    const sellRate = data?.public_sell
    const buyRate = fromCurrency?.public_buy
    const sellAmount = isNaN(parseFloat(sellRate) / parseFloat(buyRate)) ? '-' : (parseFloat(sellRate) / parseFloat(buyRate)).toFixed(3);
    
    return (
      <>
           <div className="p-4 w-full flex justify-between text-gray-500 font-light">
                <div className="w-full flex gap-4">
                  <img className="h-7 w-7 object-cover rounded-lg" src={data?.currency?.flag}/>
                  {title}</div> 
                <div className="flex flex-cols justify-around w-full"><p className="text-blue-800">1 {fromCurrency?.currency?.code}</p><p className="text-orange-400">{sellAmount} {fromCurrency && data?.currency?.symbol}</p></div>
            </div>
            <hr className="w-full"/>
      </>
    );
  };

  const handleFromCurrencySearch = (value: string) => {
    const filteredOptions = CurrencyListArray.filter((item: any) =>
      item.currency.code.toUpperCase().startsWith(value.toUpperCase())
    );
    setFromOptions(filteredOptions);
  };

  const onFromCurrencySelect = (value: any) => {
    const selectedOption = CurrencyListArray.find(
      (item: any) => item.currency.code === value
    );
    selectedOption && setFromCurrency(selectedOption);
  };


  const handleToCurrencySearch = (value: string) => {
    const filteredOptions = CurrencyListArray.filter((item: any) =>
      item.currency.code.toUpperCase().startsWith(value.toUpperCase())
    );
    setToOptions(filteredOptions);
  };

  const onToCurrencySelect = (value: any) => {
    const selectedOption = CurrencyListArray.find(
      (item: any) => item.currency.code === value
    );
    selectedOption && setToCurrency(selectedOption);
  };

  return (
    <div className="flex flex-col relative justify-start  content-around  items-center drop-shadow-md min-h-[100vh]">
      {/* Main Content here */}
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
        <p className="text-white text-start w-full mt-2 px-4 text-2xl md:w-[80vw] ml-2 ">
          Rate
        </p>

        <div className="bg-[#F6FAFF] mt-2  w-full md:w-[80vw] rounded-3xl h-full flex flex-col rounded-b-none gap-3">
         <div className="flex flex-col gap-3 px-4 pt-4">
             <div className="flex gap-2 ">
            <p className="self-center text-end text-gray-500 w-12">From:</p>
 
               <SearchSelect
                onSelect={onFromCurrencySelect}
                onSearch={handleFromCurrencySearch}
                value={fromCurrency}
                onClose={()=>setFromCurrency(null)}
                placeholder="Form currency"
                cardClassName="!h-14"
                selectCard={
                  {
                  imageUrl:fromCurrency?.currency?.flag,
                  title:fromCurrency?.currency?.code,
                  subtitle:fromCurrency?.region,
                  rightText:fromCurrency?.currency_code}
                }
                >
                {fromOptions?.map((item: any) => (
                      <Option key={item?.id} value={item?.currency.code}>
                        <div className="flex gap-2">
                          <p>{item?.currency.code}</p>
                        </div>
                      </Option>
                    ))}
                </SearchSelect>
          </div>
          <div className="flex gap-2">
            <p className="self-center text-end text-gray-500 w-12">To:</p>
         
            <SearchSelect
                
                onSelect={onToCurrencySelect}
                onSearch={handleToCurrencySearch}
                value={toCurrency}
                onClose={()=>setToCurrency(null)}
                placeholder="To currency"
                cardClassName="!h-14"
                selectCard={
                  {
                  imageUrl:toCurrency?.currency?.flag,
                  title:toCurrency?.currency?.code,
                  subtitle:toCurrency?.region,
                  rightText:toCurrency?.currency_code}
                }
                >
                {toOptions?.map((item: any) => (
                      <Option key={item?.id} value={item?.currency.code}>
                        <div className="flex gap-2">
                          <p>{item?.currency.code}</p>
                        </div>
                      </Option>
                    ))}
                </SearchSelect>
          </div>
          <div className="w-full">
            <div className="bg-white w-[100px] h-[100px] p-2 shadow-lg rounded-xl flex flex-col justify-between">
              <p>US</p>
              <div>
                <p className="text-xs text-gray-400">1 THB</p>
                <p className="text-end text-lg text-orange-300">36.5 $</p>
              </div>
            </div>
          </div>
         </div>
         

          <div className="bg-white w-full h-full rounded-3xl shadow-lg px-3">
            <div className="p-4 w-full flex justify-between text-gray-500 font-light">
                <p className="w-full ml-4">To Currency</p>
                <div className="flex flex-cols justify-around w-full"><p>From</p><p>To</p></div>
            </div>
       
            {CurrencyListArray?.map((item:any)=>{return(
              <List title={item?.currency?.code} data={item}/>
            )})}
          </div>
        </div>
     {toCurrency &&   <div className="sticky w-[90%] h-20 bg-white bottom-32 shadow-xl p-2 rounded-xl flex content-center justify-around text-center items-center">
            <Input value={fromAmount} onChange={(e)=>setFromAmount(parseFloat(e.target.value))} theme="border" className="!w-[30%] text-center text-2xl !text-[#56AEF5]"/>
            <p>{fromCurrency?.currency?.symbol}</p>
            <div className="border-l-2 border-gray-200 h-full ml-5"/>
            <Input value={toAmount || '-'} onChange={(e)=>setToAmount(parseFloat(e.target.value))} theme="border" className="!w-[30%] text-center text-2xl !text-[#F5AC56]"/>
            <p>{toCurrency?.currency?.symbol}</p>

        </div>}
      </>

      <MenuBar />
    </div>
  );
};
export default Rate;
