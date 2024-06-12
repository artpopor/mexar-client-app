import { TbHomeFilled } from "react-icons/tb";
import { PiListMagnifyingGlassLight } from "react-icons/pi";
import { VscGraphLine } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import './components.css'
const MenuBar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white w-full h-24   flex flex-cols justify-around  shadow-lg"
      style={{ position: "sticky", zIndex: 2, bottom: 0, WebkitBoxSizing:'border-box',MozBoxSizing:'border-box',boxSizing:'border-box',display:'block',float:'left', }}
    >
      <div className="w-full flex flex-cols justify-around max-w-[500px] text-gray-600 mt-2 mx-auto mb-8">
        <div className="flex flex-col items-center cursor-pointer menu-item w-full rounded-xl py-3" onClick={()=>navigate('/home')}>
          <TbHomeFilled className="text-4xl" />
          <p>Home</p>
        </div>

        <div className="flex flex-col items-center menu-item w-full rounded-xl py-3 cursor-pointer" onClick={()=>navigate('/transaction')}>
          <PiListMagnifyingGlassLight className="text-4xl" />
          <p>Transaction</p>
        </div>

        <div className="flex flex-col items-center menu-item w-full rounded-xl py-3 cursor-pointer"  onClick={()=>navigate('/rate')}>
          <VscGraphLine className="text-4xl" />
          <p>Rate</p>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
