import { useNavigate } from "react-router-dom";
import { GoGear } from "react-icons/go";
import { useState } from "react";
import Button from "../components/Button";
import { FaChevronRight } from "react-icons/fa";
import MenuBar from "../components/MenuBar";

const HomePage = () => {
  const navigate = useNavigate();
  const draftArrayData = [1,2,3,4,5,6]
  const TransactionList = () => {
    return (
      <div className="bg-white mb-2 w-full p-3 px-4 rounded-lg  drop-shadow-md flex flex-cols justify-between content-between">
        <div className="w-full flex flex-cols content-center self-center gap-3">
          <p className="self-center">17/4/67</p>
          <img width={30} height={30} className='rounded-full w-10 h-10 object-cover	' src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGFwcHklMjBnaXJsfGVufDB8fDB8fHww"/>
        </div>
        <div className="flex self-center flex-cols justify-around content-between w-full">
          <p className="text-2xl text-[#56aef5]">100</p>
          <p className="text-2xl text-[#f5ac56]" >63</p>
        </div>
        <FaChevronRight className="self-center text-gray-400 text-2xl"/>
      </div>
    );
  };
  return (
    <div className="flex flex-col  justify-start  content-around h-full items-center drop-shadow-md">
      <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
        <div className="text-white text-2xl content-center ">
          <GoGear />
        </div>
        <div className="text-white  font-semibold content-center text-center">
          <p>hello Jenny</p>
        </div>
      </div>
      {/* Main Content here */}
      <div className="bg-[#F6FAFF] mt-7 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col gap-5 ">
        <p className="font-medium text-gray-500">Services</p>
        <div className="flex self-center lg:self-start flex-cols justify-between w-full max-w-[450px] lg:w-[400px] bg-gradient-to-br from-[#5BBBFF] to-[#5983E4] rounded-3xl p-5">
          <div className="text-white">
            <p className="">Remittance</p>
            <hr className="m-1 w-64" />
            <p className="font-thin">Send money to your</p>
            <b className="text-xl font-semibold">Friend</b>
          </div>

          <Button className="!rounded-full !w-15 !h-12 !flex !justify-center self-end">
            <FaChevronRight className="text-base self-center content-center" />
          </Button>
        </div>
        <div className="flex flex-cols justify-between">
          <p className="font-medium text-gray-500">Last Transaction</p>
          <p className="font-medium text-gray-500">see all</p>
        </div>
        {/* Transaction List */}
        <div >
          {draftArrayData.map(()=>{return(<TransactionList />)})}
          
        </div>
      </div>
      {/* Menu !it's absolute */}
      <MenuBar />
    </div>
  );
};

export default HomePage;
