import { TbHomeFilled } from "react-icons/tb";
import { PiListMagnifyingGlassLight } from "react-icons/pi";
import { VscGraphLine } from "react-icons/vsc";

const MenuBar = () => {
  return (
    <div className="bg-white w-full h-24 fixed bottom-0 flex flex-cols justify-around p-4 shadow-lg"
    style={{position:'sticky',maxHeight:'100vh'}}
    >
      <div className="w-full flex flex-cols justify-around max-w-[500px] text-gray-600 mt-2 mx-auto">
        <div className="flex flex-col items-center">
          <TbHomeFilled className="text-4xl" />
          <p>Home</p>
        </div>

        <div className="flex flex-col items-center">
          <PiListMagnifyingGlassLight className="text-4xl" />
          <p>Transaction</p>
        </div>

        <div className="flex flex-col items-center">
          <VscGraphLine className="text-4xl" />
          <p>Rate</p>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
