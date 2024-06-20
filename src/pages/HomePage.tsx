import { useNavigate } from "react-router-dom";
import { GoGear } from "react-icons/go";
import { useEffect } from "react";
import Button from "../components/Button";
import { FaChevronRight } from "react-icons/fa";
import MenuBar from "../components/MenuBar";
import ProfileSection from "./ProfileSection";
import { useGetUserTransactionQuery } from "../services/apiStore";
import { Spin } from "antd";
import { MdExpandMore } from "react-icons/md";
import { animated, useSpring } from "@react-spring/web";

const HomePage = () => {
  const navigate = useNavigate();
  const springs = useSpring({
    from: { x: 100 },
    to: { x: 0 },
  });
  const { data, error, isLoading } = useGetUserTransactionQuery(
    localStorage.getItem("access_token")
  );
  function formatNumber(num: number) {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + "B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + "K";
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
    const status = data?.data.status;
    let bgColorClass;

    if (status === "completed") {
      bgColorClass = "bg-green-400";
    } else if (status === "lead") {
      bgColorClass = "bg-orange-400";
    } else if (status === "pending") {
      bgColorClass = "bg-yellow-400";
    } else {
      bgColorClass = "bg-blue-300";
    }
    return (
      <animated.div
        style={{ ...springs }}
        onClick={() => navigate(`/transaction/${items?.[0]?.id}`)}
        className="bg-white cursor-pointer hover:bg-slate-100 mb-2 w-full p-3 px-4 rounded-lg drop-shadow-md flex flex-cols justify-between content-center"
      >
        <div className="flex w-[40%] flex-cols content-center self-center gap-3">
          <div>
            <div className="flex">
              <p className="text-[#56aef5]">
                {entity?.name || `${entity?.first_name} ${entity?.last_name}`}
              </p>
            </div>
            <p className="self-center text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 w-[60%]  content-center items-center relative">
          <div className="flex flex-row">
            <img
              width={30}
              height={30}
              className="rounded-lg w-5 h-5 object-cover self-center mr-1"
              src={items[0].from_currency.flag}
            />
            <div className="text-sm text-[#56aef5] m-1">
              <span className="text-sm md:text-xl">{from_currency}</span>{" "}
              {formatNumber(parseFloat(from_amount))}
            </div>
          </div>
          <FaChevronRight className="self-center w-full text-gray-400" />
          <div className="flex flex-row">
            <img
              width={30}
              height={30}
              className="rounded-lg w-5 h-5 object-cover self-center mr-1"
              src={items[0].to_currency.flag}
            />
            <div className="text-sm text-[#f5ac56] m-1">
              <span className="text-sm md:text-xl mr-1">{to_currency}</span>{" "}
              <span>{formatNumber(parseFloat(to_amount))}</span>
            </div>
          </div>
          <p
            className={`${bgColorClass} text-white inline-block text-xs text-right absolute -top-5 -right-8  rounded-md p-1`}
          >
            {status}
          </p>
        </div>
      </animated.div>
    );
  };
  useEffect(() => {
    const checkIsAuthen = () => {
      const isAuthen = localStorage.getItem("access_token");
      if (!isAuthen) {
        navigate("/login");
      }
    };
    checkIsAuthen();
  }, []);
  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error]);
  return (
    <div className="flex flex-col justify-start  content-around min-h-screen items-center drop-shadow-md">
      <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
        <div className="text-white text-3xl content-center ">
          <GoGear
            className="cursor-pointer"
            onClick={() => navigate("/setting")}
          />
        </div>
        <ProfileSection />
      </div>
      {/* Main Content here */}
      <div className="bg-[#F6FAFF] !min-h-screen mt-7 w-full md:w-[80vw] rounded-3xl  flex flex-col  rounded-b-none">
        <div className="p-5 flex flex-col gap-3">
          <p className="font-medium text-gray-500">Services</p>
          <animated.div
            style={{ ...springs }}
            className="flex mb-2 self-center lg:self-start flex-cols justify-between w-full max-w-[450px] lg:w-[400px] bg-gradient-to-br from-[#5BBBFF] to-[#5983E4]  rounded-3xl p-5"
          >
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
          </animated.div>
        </div>

        <div className="flex flex-cols justify-between text-gray-500 px-4">
          <p className="font-medium">Lastest Transaction</p>
          <p
            className="font-medium cursor-pointer hover:text-[#56AEF5]"
            onClick={() => navigate("/transaction")}
          >
            See all
          </p>
        </div>
        <div>
          <div className="px-4 py-3">
            <hr className="w-full text-center " />
          </div>
          {isLoading && (
            <Spin className="self-center w-full !h-full" size="large" />
          )}
          <div className="overflow-y-auto h-[calc(100vh_-_480px)] px-5 pt-3 overflow-x-visible ">
            {data?.data?.slice(0, 6).map((list: any) => {
              return <TransactionList data={list} key={list.id} />;
            })}
            <MdExpandMore
              className="self-center w-full text-gray-400 text-3xl hover:text-[#56AEF5] cursor-pointer"
              onClick={() => navigate("/transaction")}
            />
          </div>
        </div>
      </div>
      <MenuBar />
    </div>
  );
};

export default HomePage;
