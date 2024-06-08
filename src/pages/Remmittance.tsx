import { useNavigate } from "react-router-dom";
import { GoGear } from "react-icons/go";
import { useState } from "react";
import Button from "../components/Button";
import { FaChevronRight } from "react-icons/fa";
import MenuBar from "../components/MenuBar";
import { IoChevronBack } from "react-icons/io5";
import ProfileSection from "./ProfileSection";
import CustomSelect from "../components/Select";
// import Input from "../components/Input";
import { Input, Select, Space } from "antd";

const Remmittance = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  justify-start  content-around  items-center drop-shadow-md h-full">
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
      {/* Main Content here */}
      <p className="text-white text-start w-full mt-2 px-4 text-2xl md:w-[80vw]  ">
        01 - Enter order Detail
      </p>
      <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col gap-5 justify-between rounded-b-none">
        <div className="flex flex-col gap-2">
          <p className="font-thin text-gray-500">Destination Country</p>
          <CustomSelect className="h-12" placeholder="Select Country" />
          <p className="font-thin text-gray-500">From Currency</p>
          <Input
            className="border border-none drop-shadow-md h-12 rounded-xl "
            placeholder={"amount"}
          />
          <p className="font-thin text-gray-500">Sale rate</p>
          <Input
            className="border border-none drop-shadow-md h-12 rounded-xl"
            placeholder={"amount"}
          />
          <p className="font-thin text-gray-500">To Currency</p>
          <CustomSelect className="h-12" placeholder="Select Country" />
        </div>

        <Button className="w-full mb-[100px] text-white font-light drop-shadow-md !bg-[#2d4da3]">
          Next
        </Button>
      </div>
      <div></div>
      <MenuBar />
    </div>
  );
};
export default Remmittance;
