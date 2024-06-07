import { TbHomeFilled } from "react-icons/tb";
import { PiListMagnifyingGlassLight } from "react-icons/pi";
import { VscGraphLine } from "react-icons/vsc";

const MenuBar = () => {
  return (
    <div className="bg-white w-full h-24 fixed bottom-0 flex flex-cols justify-around p-4">
      <div className="w-full flex flex-cols justify-around max-w-[500px] text-gray-600 mt-2">
        <div className=" flex flex-col content-center">
          <TbHomeFilled className="text-4xl !self-center" />
          <p>Home</p>
        </div>

        <div className=" flex flex-col content-center">
          <PiListMagnifyingGlassLight className="text-4xl !self-center" />
          <p className="self-center">Transaction</p>
        </div>

        <div className="flex flex-col content-center">
          <VscGraphLine className="text-4xl !self-center" />
          <p className="self-center">Rate</p>
        </div>
      </div>
    </div>
  );
};
export default MenuBar;
