import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import MenuBar from "../../components/MenuBar";
import { IoChevronBack } from "react-icons/io5";
import ProfileSection from "../ProfileSection";
import "../../components/components.css";
import { FaList } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { useGetTransactionDetailQuery } from "../../services/jsonServerApi";
import { useParams } from "react-router-dom";
import { Checkbox } from "antd";

const TransactionDetail = () => {
  const navigate = useNavigate();
  // const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const access_token = localStorage.getItem("access_token");
  const { transactionId } = useParams();
  console.log("transactionId :>> ", transactionId);
  const { data, error, isLoading } = useGetTransactionDetailQuery({
    token: access_token,
    transactionId: transactionId,
  });
  useEffect(() => {
    console.log("data :>> ", data?.data?.items?.[0].to_amount);
  }, [data]);
  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error]);
  const detailLists = [
    {
      title: "Purpose of transaction",
      data: "",
    },
    {
      title: "Public Buy",
      data: "",
    },
    {
        title: "Total to recieve",
        data: data?.data?.items?.[0].to_amount,
      },
  ];
  const List = ({ title, data }: any) => {
    return (
      <>
        <div className="flex flex-cols justify-between text-gray-500 font-thin">
          <p>{title}</p>
          <p className="font-normal">{data}</p>
        </div>
        <hr className="w-full " />
      </>
    );
  };

  return (
    <div className="flex flex-col  justify-start  content-around  items-center drop-shadow-md h-full">
      {/* Main Content here */}
      <>
        <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
          <div
            onClick={() => navigate("/transaction")}
            className="text-white text-xl flex flex-cols gap-3 cursor-pointer "
          >
            <IoChevronBack className="text-xl self-center" />
            <p className="self-center">Back</p>
          </div>
          <ProfileSection />
        </div>
        <p className="text-white text-start w-full mt-2 px-4 text-2xl md:w-[80vw]  ">
          Transaction Detail
        </p>

        <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col rounded-b-none">
          <div className="flex flex-col justify-start gap-4 h-full">
            <div className="shadow-lg w-full flex rounded-2xl bg-white p-5">
              <div className="flex gap-4">
                <img
                  src={data?.data?.user?.avatar_url}
                  className="rounded-full h-10 w-10"
                />
                <p className="text-blue-900">{data?.data?.user?.name}</p>
              </div>
            </div>
            <div className="flex flex-cols gap-3">
              <Checkbox />
              <p className="text-gray-500 text-md font-thin">
                Send and recieve account
              </p>
            </div>
            {detailLists.map((list) => {
              return <List title={list?.title} data={list?.data} />;
            })}
          </div>
        </div>
      </>

      <MenuBar />
    </div>
  );
};
export default TransactionDetail;
