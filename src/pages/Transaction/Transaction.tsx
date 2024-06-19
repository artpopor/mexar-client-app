import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import MenuBar from "../../components/MenuBar";
import { IoChevronBack } from "react-icons/io5";
import ProfileSection from "../ProfileSection";
import "../../components/components.css";
import { FaList } from "react-icons/fa6";
import { useGetUserTransactionQuery } from "../../services/apiStore";
import { Spin } from "antd";

const Transaction = () => {
  const navigate = useNavigate();
  // const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const access_token = localStorage.getItem("access_token");
  const { data, error, isLoading, refetch } = useGetUserTransactionQuery(access_token);

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error]);

  useEffect(() => {

    refetch();
  }, []);
  function formatNumber(num: number) {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + 'K';
    } else {
      return num.toString();
    }
  }
  const TransactionList = (data: any) => {
    const { items, entity } = data.data;
    const from_currency = items[0].from_currency.code;
    // const from_amount = items[0].from_amount
    const from_amount = parseFloat(items[0].from_amount).toFixed(2);
    const date = new Date(items[0].created_at);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;

    const to_currency = items[0].to_currency.code;
    const to_amount = parseFloat(items[0].to_amount).toFixed(2);
    const status = data?.data.status
    let bgColorClass;

    if (status === 'completed') {
      bgColorClass = 'bg-green-400';
    } else if (status === 'lead') {
      bgColorClass = 'bg-orange-400';
    } else if (status === 'pending') {
      bgColorClass = 'bg-yellow-400';
    } else {
      bgColorClass = 'bg-blue-300'; 
    }
    return (
      <div onClick={() => navigate(`/transaction/${items?.[0]?.id}`)} className="bg-white cursor-pointer  hover:bg-slate-100 mb-3 w-full p-3 px-4 rounded-lg  drop-shadow-md flex flex-cols justify-between content-center ">
        <div className="flex w-[40%] flex-cols content-center self-center gap-3">
          {/* <img
            width={30}
            height={30}
            className="rounded-full w-10 h-10 object-cover	"
            src={user?.avatar_url}
          /> */}
          <div>
            <p className="text-[#56aef5]">{entity?.name || `${entity?.first_name} ${entity?.last_name}`} </p>
            <p className="self-center text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-2  w-[60%] content-center items-center relative">
          <div className="flex flex-row">
            <img
              width={30}
              height={30}
              className="rounded-lg w-5 h-5 object-cover self-center mr-1"
              src={items[0].from_currency.flag}
            />
            <div className="text-sm text-[#56aef5] m-1">
              <p className="text-sm md:text-xl">{from_currency}</p>{" "}
              <p>{formatNumber(parseFloat(from_amount))}</p>
            </div>
          </div>

          <div className="flex flex-row">
            <img
              width={30}
              height={30}
              className="rounded-lg w-5 h-5 object-cover self-center mr-1"
              src={items[0].to_currency.flag}
            />
            <div className="text-sm text-[#f5ac56] m-1">
              <p className="text-sm md:text-xl mr-1">{to_currency}</p>{" "}
              <p>{formatNumber(parseFloat(to_amount))}</p>
            </div>
          </div>
          <p style={{position:'absolute',top:'-10px',right:'-10px'}} className={`${bgColorClass} text-white text-xs text-right absolute -top-2 -right-2 border b rounded-md p-1`}>{data?.data.status}</p>

        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col  justify-start  content-around  items-center drop-shadow-md min-h-screen">
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
        <p className="text-white text-start w-full mt-2 px-4 text-2xl md:w-[80vw]  ">
          Transaction
        </p>

        <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col rounded-b-none min-h-screen">
          <div className="flex flex-col justify-start gap-4 h-full">
            <div className="flex flex-cols justify-end gap-3 content-center">
              List view
              <FaList className="self-center" />
            </div>
            <div className="w-full  flex flex-cols justify-between">
              <div className="w-[40%]"></div>
              <div className="flex flex-cols justify-around w-full">
                <p>From</p>
                <p>To</p>
              </div>
            </div>

            <hr className="w-full" />
            <div>
              {data?.data?.map((list: any) => {
                return <TransactionList key={list?.id} data={list} />;
              })}
            </div>
            {
              isLoading && <Spin className="self-center w-full !h-full" size="large" />
            }
          </div>
        </div>
      </>

      <MenuBar />
    </div>
  );
};
export default Transaction;
