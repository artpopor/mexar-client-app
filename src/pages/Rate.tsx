import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import MenuBar from "../components/MenuBar";
import { useGetCurrencyListQuery } from "../services/apiStore";
import ProfileSection from "./ProfileSection";
import SearchSelect from "../components/SearchSelect";
import { AutoComplete, Spin } from "antd";
import Input from "../components/Input";
import { TbCoinFilled } from "react-icons/tb";

const Rate = () => {
  const navigate = useNavigate();
  const { Option } = AutoComplete;
  const access_token = localStorage.getItem("access_token");
  const CurrencyListData = useGetCurrencyListQuery(access_token);
  const CurrencyListArray = CurrencyListData?.data?.data;
  const [toCurrency, setToCurrency] = useState<any>(null);
  const [fromCurrency, setFromCurrency] = useState<any>(null);
  const [fromOptions, setFromOptions] = useState<any[]>([]);
  const [toOptions, setToOptions] = useState<any[]>([]);
  const [fromAmount, setFromAmount] = useState<number | undefined>(undefined);
  const [toAmount, setToAmount] = useState<number | undefined>(undefined);
  const savedExchange = localStorage.getItem('itemsArray') ? JSON.parse(localStorage.getItem('itemsArray') || '') : [];

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      const sellRate = parseFloat(toCurrency.public_sell);
      const buyRate = parseFloat(fromCurrency.public_buy);
      const calRate = sellRate / buyRate;
      if (fromAmount) {
        setToAmount(fromAmount * calRate);
      }
    }
  }, [fromCurrency, toCurrency, fromAmount]);

  const List = ({ title, data }: { title: string, data: any }) => {
    const sellRate = data.public_sell;
    const buyRate = fromCurrency?.public_buy;
    const sellAmount = isNaN(parseFloat(sellRate) / parseFloat(buyRate)) ? '-' : (parseFloat(sellRate) / parseFloat(buyRate)).toFixed(3);

    return (
      <>
        <div className="p-4 w-full flex justify-between text-gray-500 font-light">
          <div className="w-full flex gap-4">
            <img className="h-7 w-7 object-cover rounded-lg" src={data.currency.flag} alt={`${data.currency.code} flag`} />
            {title}
          </div>
          <div className="flex flex-cols justify-around w-full">
            <p className="text-blue-800">1 {fromCurrency?.currency?.code}</p>
            <p className="text-orange-400">{sellAmount} {fromCurrency && data.currency.symbol}</p>
          </div>
        </div>
        <hr className="w-full" />
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

    if (selectedOption && fromCurrency) {
      const sellRate = parseFloat(selectedOption.public_sell);
      const buyRate = parseFloat(fromCurrency.public_buy);
      const calRate = sellRate / buyRate;
      const saveItem = { from: fromCurrency, to: selectedOption, rate: calRate };
      let savedEntity = localStorage.getItem('itemsArray');
      let itemsArray = savedEntity ? JSON.parse(savedEntity) : [];
      if (!itemsArray.some((item: any) => item.from.currency.code === saveItem.from.currency.code && item.to.currency.code === saveItem.to.currency.code)) {
        itemsArray.push(saveItem);
      }
      localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
    }
  };

  return (
    <div className="flex flex-col relative justify-start  content-around  items-center drop-shadow-md !min-h-screen">
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

        <div className="bg-[#F6FAFF] p-3 mt-2  w-full md:w-[80vw] rounded-3xl h-full flex flex-col rounded-b-none gap-3 !min-h-screen">
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex gap-2 ">
              <p className="self-center text-end text-gray-500 w-12">From:</p>

              <SearchSelect
                onSelect={onFromCurrencySelect}
                onSearch={handleFromCurrencySearch}
                value={fromCurrency}
                onClose={() => setFromCurrency(null)}
                placeholder="Form currency"
                cardClassName="!h-14"
                selectCard={
                  {
                    imageUrl: fromCurrency?.currency?.flag,
                    title: fromCurrency?.currency?.code,
                    subtitle: fromCurrency?.region,
                    rightText: fromCurrency?.currency_code
                  }
                }
              >
                {fromOptions.map((item: any) => (
                  <Option key={item.id} value={item.currency.code}>
                    <div className="flex gap-2">
                      <p>{item.currency.code}</p>
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
                onClose={() => setToCurrency(null)}
                placeholder="To currency"
                cardClassName="!h-14"
                selectCard={
                  {
                    imageUrl: toCurrency?.currency?.flag,
                    title: toCurrency?.currency?.code,
                    subtitle: toCurrency?.region,
                    rightText: toCurrency?.currency_code
                  }
                }
              >
                {toOptions.map((item: any) => (
                  <Option key={item.id} value={item.currency.code}>
                    <div className="flex gap-2">
                      <p>{item.currency.code}</p>
                    </div>
                  </Option>
                ))}
              </SearchSelect>
            </div>
            <div className="w-full flex content-center justify-start gap-2">

              {savedExchange.slice(0, 3).map((item: any, index: number) => {
                return (
                  <div key={index} onClick={() => { setFromCurrency(item.from); setToCurrency(item.to); }} className="bg-white hover:bg-slate-100 cursor-pointer min-w-[100px] min-h-[100px] p-3 shadow-lg rounded-xl grid grid-cols-3 justify-between">
                    <img className="col-span-1 h-6 w-6 object-cover rounded-full " src={item.from.currency.flag} alt={`${item.from.currency.code} flag`} />
                    <div className="col-span-2 text-center">
                      <p>{item.from.currency.code}</p>
                    </div>
                    <p className="text-xs mt-1 text-gray-400 col-span-3 ">1 {item.from.currency.code}</p>
                    <div className="col-span-3 flex text-end text-lg text-orange-300 gap-1 justify-end">{item.rate.toFixed(2)} <p className="self-center">{item.to.currency.code}</p></div>
                  </div>
                );
              })}

            </div>
          </div>

          {fromCurrency && (
            <div className="bg-white w-full h-full rounded-3xl shadow-lg px-3">
              <div className="p-4 w-full flex justify-between text-gray-500 font-light">
                <p className="w-full ml-4">To Currency</p>
                <div className="flex flex-cols justify-around w-full"><p>From</p><p>To</p></div>
              </div>
              {CurrencyListArray.map((item: any) => (
                <List key={item.id} title={item.currency.code} data={item} />
              ))}
              {CurrencyListData.isLoading && <Spin className="self-center w-full !h-full m-5" size="large" />}
            </div>
          ) || (
            <div className="w-full text-center h-[30vh] rounded-3xl text-gray-400 items-center align-middle content-center flex gap-1 justify-center border">
              <p>Select From currency to see rate</p>
              <TbCoinFilled />
            </div>
          )}
        </div>
        {toCurrency && (
          <div className="sticky w-[90%] h-20 bg-white bottom-32 shadow-xl p-2 rounded-xl flex content-center justify-around text-center items-center">
            <Input value={fromAmount} onChange={(e) => setFromAmount(parseFloat(e.target.value))} theme="border" className="!w-[30%] text-center text-2xl !text-[#56AEF5]" />
            <p>{fromCurrency?.currency?.symbol}</p>
            <div className="border-l-2 border-gray-200 h-full ml-5" />
            <Input value={toAmount || '-'} onChange={(e) => setToAmount(parseFloat(e.target.value))} theme="border" className="!w-[30%] text-center text-2xl !text-[#F5AC56]" />
            <p>{toCurrency?.currency?.symbol}</p>
          </div>
        )}
      </>
      <MenuBar />
    </div>
  );
};
export default Rate;
