import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import MenuBar from "../components/MenuBar";

import { useParams } from "react-router-dom";
import { Checkbox } from "antd";
import { RiPencilFill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import ProfileSection from "./ProfileSection";
const Rate = () => {
  const navigate = useNavigate();
  // const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const access_token = localStorage.getItem("access_token");
  const { transactionId } = useParams();

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
        <div className=" flex flex-cols content-center text-center justify-between w-full px-s4 mt-7">
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
            <input
              placeholder="THB"
              className="px-4 w-full py-3 rounded-xl shadow-md"
            ></input>
          </div>
          <div className="flex gap-2">
            <p className="self-center text-end text-gray-500 w-12">To:</p>
            <input
              placeholder="THB"
              className="px-4 w-full py-3 rounded-xl shadow-md"
            ></input>
          </div>
          <div className="w-full">
            <div className="bg-white w-24 h-24 p-2 shadow-lg rounded-xl flex flex-col justify-between">
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
                <p className="w-full ml-4">Rate</p>
                <div className="flex flex-cols justify-around w-full"><p>Buy</p><p>Sell</p></div>
            </div>
            <div className="p-4 w-full flex justify-between text-gray-500 font-light">
                <p className="w-full ">USD</p> 
                <div className="flex flex-cols justify-around w-full"><p className="text-blue-800">100</p><p className="text-orange-400">63.3</p></div>
            </div>
            <hr className="w-full"/>
          </div>
        </div>
      </>

      <MenuBar />
    </div>
  );
};
export default Rate;
