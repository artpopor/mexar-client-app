import { useNavigate } from "react-router-dom";
import { GoGear } from "react-icons/go";
import { useState } from "react";
import Button from "../components/Button";
import { FaChevronRight } from "react-icons/fa";
import MenuBar from "../components/MenuBar";
import { IoChevronBack } from "react-icons/io5";
import ProfileSection from "./ProfileSection";
import CustomSelect from "../components/Select";
import Input from "../components/Input";

const Remmittance = () => {
  const navigate = useNavigate();
  const draftArrayData = [1, 2, 3, 4, 5, 6];
  const profileImgUrl =
    "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGFwcHklMjBnaXJsfGVufDB8fDB8fHww";

  return (
    <div className="flex flex-col  justify-start  content-around h-full items-center drop-shadow-md">
      <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
        <div
          onClick={() => navigate("/home")}
          className="text-white text-xl flex flex-cols gap-3 "
        >
          <IoChevronBack className="text-xl self-center" />
          <p className="self-center">Back</p>
        </div>
        <ProfileSection />
      </div>
      {/* Main Content here */}
      <p className="text-white text-start w-full mt-2 px-4 text-2xl md:w-[80vw] ">
        01 - Enter order Detail
      </p>
      <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col gap-5 justify-between">
        <div>
          <p className="font-thin text-gray-500">Destination Country</p>
          <CustomSelect className="h-10" placeholder="Select Country" />
          <p className="font-thin text-gray-500">From Currency</p>
          <Input className="border border-gray-900" placeholder={"amount"} />
          <p className="font-thin text-gray-500">Sale rate</p>
          <Input className="border border-gray-900" placeholder={"amount"} />
          <p className="font-thin text-gray-500">To Csurrency</p>
          <CustomSelect className="h-10" placeholder="Select Country" />
        </div>
        <div className="w-full h-full bg-red-500 mb-7 content-center">
          
          <Button className="w-full !bg-slate-950">Next</Button>
        </div>
      </div>

      <MenuBar />
    </div>
  );
};
export default Remmittance;
