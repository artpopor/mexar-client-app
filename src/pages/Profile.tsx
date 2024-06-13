import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import MenuBar from "../components/MenuBar";

import { useParams } from "react-router-dom";
import { Checkbox } from "antd";
import { RiPencilFill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { useGetUserInfoQuery } from "../services/apiStore";

const Profile = () => {
  const navigate = useNavigate();
  // const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const access_token = localStorage.getItem("access_token");
  const { transactionId } = useParams();
  console.log("transactionId :>> ", transactionId);
  const getUserInfo = useGetUserInfoQuery(access_token)
  const userInfo = getUserInfo?.data?.data
  useEffect(()=>{
    console.log('User :>> ', userInfo);
  },[userInfo])
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
            onClick={() => navigate("/home")}
            className="text-white text-xl flex flex-cols gap-3 cursor-pointer "
          >
            <IoChevronBack className="text-xl self-center" />
            <p className="self-center">Back</p>
          </div>
        </div>
        <div className="text-white mb-7 text-start w-full mt-2 px-4 text-2xl md:w-[80vw] flex flex-col self-center content-center justify-center">
          <div className="self-center flex-col content-center justify-center">
            <div className="self-center text-center content-center flex justify-center bg-white h-[120px] w-[120px] rounded-full m-3  ">
              <img src={userInfo.avatar_url} className="self-center  w-[100px] h-[100px] rounded-full object-cover"/>
            </div>
            <div className="flex flex-cols gap-2 text-center content-center justify-center">
              <div className="text-center">
                <p className="self-center ">{userInfo.name}</p>
                <p className="self-center font-thin text-base">{`@${userInfo.username}`}</p>
              </div>
              <RiPencilFill className="self-center" />
            </div>
          </div>
        </div>
        <div className="flex flex-row  justify-around w-full mb-4">
          <div className="text-white flex flex-col text-center font-extralight">
            Outcome Total<p className="text-4xl font-thin">1000</p>
            <div className="flex"><p className="self-end font-thin mr-1 ">December</p><FaChevronDown className="self-center text-xs"/></div>
          </div>
          <div className="text-white bg-white w-[1px] h-full"/>
          <div className="text-white text-center font-extralight">
            Outcome Total<p className="text-4xl font-thin">THB</p>
          </div>
        </div>

        <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col rounded-b-none">
            <p className="text-gray-500 mb-4">Basic Infomations</p>
            <div className="flex content-center gap-2 ">
                <p className="text-gray-400 font-thin self-center">Birthday:</p>
                <input className="rounded-xl shadow-md p-3 px-5 w-full" placeholder="birthday"/>
            </div>
        </div>
      </>

      <MenuBar />
    </div>
  );
};
export default Profile;
