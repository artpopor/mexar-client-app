import React, { useState } from 'react';
import { TbHomeFilled } from "react-icons/tb";
import { PiListMagnifyingGlassLight } from "react-icons/pi";
import { VscGraphLine } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import './components.css';

const MenuBar = () => {
  const [active, setActive] = useState<string>('');
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    setActive(path);
    navigate(`/${path}`);
  };

  const getItemClass = (path: string) => (
    `flex flex-col items-center cursor-pointer menu-item w-full rounded-xl py-3 ${active === path ? 'text-blue-500' : 'text-gray-600'}`
  );

  return (
    <div
      className="bg-white w-full h-24 flex flex-cols justify-around shadow-lg"
      style={{ position: "sticky", zIndex: 2, bottom: 0, WebkitBoxSizing:'border-box', MozBoxSizing:'border-box', boxSizing:'border-box', display:'block', float:'left' }}
    >
      <div className="w-full flex flex-cols justify-around max-w-[500px] mt-2 mx-auto mb-8">
        <div className={getItemClass('home')} onClick={() => handleMenuItemClick('home')}>
          <TbHomeFilled className="text-4xl" />
          <p>Home</p>
        </div>

        <div className={getItemClass('transaction')} onClick={() => handleMenuItemClick('transaction')}>
          <PiListMagnifyingGlassLight className="text-4xl" />
          <p>Transaction</p>
        </div>

        <div className={getItemClass('rate')} onClick={() => handleMenuItemClick('rate')}>
          <VscGraphLine className="text-4xl" />
          <p>Rate</p>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
