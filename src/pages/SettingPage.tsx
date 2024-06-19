import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoIosCall } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";


const Setting = () => {
  const navigate = useNavigate();
  const profileImgUrl =
    "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGFwcHklMjBnaXJsfGVufDB8fDB8fHww";
    const onLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/login')
    }
  return (
    <div className=" w-full h-[100vh]">
      <div className="bg-white w-full h-[280px] p-3">
        <div
          onClick={() => navigate("/home")}
          className="text-gray-600 text-xl flex flex-cols gap-3 cursor-pointer  "
        >
          <IoChevronBack className="text-xl self-center" />
          <p className="self-center">Back</p>
        </div>
        <div className="w-full h-[90%] flex flex-cols content-center justify-center gap-3">
          <img
            width={100}
            height={100}
            className="rounded-full w-[150px] h-[150px] object-cover	self-center"
            src={profileImgUrl}
          />
          <div className="self-center p-2">
            <p className="text-blue-900 text-xl font-semibold">Jenny Kim</p>
            <p className="mt-1 text-blue-400 text-sm">@Jenny2024</p>
            <div className="bg-blue-400 mt-2 text-white p-2 text-sm text-center font-semibold rounded-full shadow-md">Edit profile</div>

          </div>
        </div>
      </div>
      <div className="text-white pt-4 pl-4 pb-2">PREFERENCE</div>
      <div className="bg-white h-[70%] pb-8 w-full pt-8 flex flex-col justify-between content-between ">
      <div >
              <div className="px-8 py-6 text-xl text-gray-600 font-extralight flex justify-between content-center hover:bg-slate-200 cursor-pointer">
            <p>Contact us</p>
            <IoIosCall className="self-center"/>
        </div>
        <div className="px-8 py-6 text-xl text-gray-600 font-extralight flex justify-between content-center hover:bg-slate-200 cursor-pointer">
            <p>Password Change</p>
            <FaLock className="self-center"/>
        </div>
        <div className="px-8 py-6 text-xl text-gray-600 font-extralight flex justify-between content-center hover:bg-slate-200 cursor-pointer">
            <p>Privacy policy</p>
            <FaBookOpen className="self-center"/>
        </div>
      </div>
      <div onClick={onLogout} className="px-8 py-6 mb-10 text-xl text-red-600 font-extralight flex justify-between content-center hover:bg-slate-200 cursor-pointer">
            <p>Logout</p>
            <IoIosLogOut className="self-center"/>
        </div>
  
      </div>
    </div>
  );
};
export default Setting;
