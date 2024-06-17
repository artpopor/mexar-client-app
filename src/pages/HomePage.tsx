import { useNavigate } from "react-router-dom";
import { GoGear } from "react-icons/go";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { FaChevronRight } from "react-icons/fa";
import MenuBar from "../components/MenuBar";
import ProfileSection from "./ProfileSection";
import { useGetUserTransactionQuery } from "../services/apiStore";
import { Spin } from "antd";
const HomePage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUserTransactionQuery(
    localStorage.getItem("access_token")
  );

  const TransactionList = (data: any) => {
    const { user, items } = data.data;
    const from_currency = items[0].from_currency.code;
    const from_amount = parseFloat(items[0].from_amount).toFixed(2);
    const date = new Date(items[0].created_at);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;

    const to_currency = items[0].to_currency.code;
    const to_amount = parseFloat(items[0].to_amount).toFixed(2);
    return (
      <div className="bg-white mb-2 w-full p-3 px-4 rounded-lg  drop-shadow-md flex flex-cols justify-between content-between ">
        <div className="w-full flex flex-cols content-center self-center gap-3">
          <p className="self-center text-gray-500">{formattedDate}</p>
          <img
            width={30}
            height={30}
            className="rounded-full w-10 h-10 object-cover	"
            src={user?.avatar_url}
          />
        </div>
        <div className="flex self-center flex-cols justify-around content-between w-full">
          <p className="text-xl text-[#56aef5] m-1">
            <p className="text-sm md:text-xl">{from_currency}</p> {from_amount}
          </p>
          <p className="text-xl text-[#f5ac56] m-1">
            <p className="text-sm md:text-xl">{to_currency}</p> {to_amount}
          </p>
        </div>
        <FaChevronRight className="self-center text-gray-400 text-2xl" />
      </div>
    );
  };
  useEffect(() => {
    const checkIsAuthen = () => {
      const isAuthen = localStorage.getItem("access_token")
      if (!isAuthen) {
        navigate('/login')
      }
    }
    checkIsAuthen()
  }, [])
  useEffect(() => {
    console.log('error :>> ', error);
    if (error) { navigate('/login') }
  }, [error])
  return (
    <div className="flex flex-col justify-start  content-around h-full items-center drop-shadow-md">
      <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
        <div className="text-white text-3xl content-center ">
          <GoGear className="cursor-pointer" onClick={() => navigate('/setting')} />
        </div>
        <ProfileSection />
      </div>
      {/* Main Content here */}
      <div className="bg-[#F6FAFF] !min-h-screen mt-7 p-5 w-full md:w-[80vw] rounded-3xl  flex flex-col gap-3 h-auto  rounded-b-none">
        <p className="font-medium text-gray-500">Services</p>
        <div className="flex self-center lg:self-start flex-cols justify-between w-full max-w-[450px] lg:w-[400px] bg-gradient-to-br from-[#5BBBFF] to-[#5983E4]  rounded-3xl p-5">
          <div className="text-white">
            <p className="">Remittance</p>
            <hr className="m-1 w-64" />
            <p className="font-thin">Send money to your</p>
            <b className="text-xl font-semibold">Friend</b>
          </div>

          <Button
            onClick={() => navigate("/remittance")}
            className="!rounded-full !w-15 !h-12 !flex !justify-center self-end"
          >
            <FaChevronRight className="text-base self-center content-center" />
          </Button>
        </div>
        <div className="flex flex-cols justify-between text-gray-500">
          <p className="font-medium">Last Transaction</p>
          <p className="font-medium cursor-pointer hover:text-[#56AEF5]" onClick={() => navigate('/transaction')}>see all</p>
        </div>
        <hr className="w-full" />
        {/* Transaction List */}
        <div>
          <div className="w-full mb-2 text-gray-400 flex flex-cols content-between justify-between">
            <div className="w-full"></div>
            <div className="w-full  flex flex-cols justify-around">
              <p>From</p>
              <p>To</p>
            </div>

          </div>
          <hr className="w-full mb-2" />
          {
            isLoading && <Spin className="self-center w-full !h-full" size="large"/>
          }
          {data?.data?.map((list: any) => {
            return <TransactionList data={list} />;
          })}
        </div>
      </div>
      {/* Menu !it's absolute */}
      <MenuBar />
    </div>
  );
};

export default HomePage;
