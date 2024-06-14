import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import MenuBar from "../../components/MenuBar";
import { IoChevronBack } from "react-icons/io5";
import ProfileSection from "../ProfileSection";
import "../../components/components.css";
import { FaList } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { useGetTransactionDetailQuery } from "../../services/apiStore";
import { useParams } from "react-router-dom";
import { Checkbox,Modal } from "antd";

const TransactionDetail = () => {
  const navigate = useNavigate();
  const [modalImgUrl, setModalImgUrl] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  // const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const access_token = localStorage.getItem("access_token");
  const { transactionId } = useParams();
  console.log("transactionId :>> ", transactionId);
  const { data, error, isLoading } = useGetTransactionDetailQuery({
    token: access_token,
    transactionId: transactionId,
  });
  const items = data?.data?.items
  const uploadedDatas = data?.data?.files
  const user = data?.data.user
  useEffect(() => {
    console.log("data :>> ", data?.data);
  }, [data]);
  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error]);
  const summaryList = [
    {
      title: 'Purpose of transaction',
      value: <p className="font-normal text-gray-500">{}</p>
    },
    {
      title: 'Public Buy',
      value: <p>{items?.[0]?.from_currency_buy_rate}</p>
    },
    {
      title: 'Public Sell',
      value: <p>{items?.[0]?.to_currency_sell_rate}</p>
    },
    {
      title: 'Exchange Rate',
      value: <p>{items?.[0]?.transaction_exchange_rate}</p>
    },
    {
      title: 'You send',
      value: <p>{items?.[0]?.from_amount} {items?.[0]?.from_currency?.symbol}</p>
    },
    {
      title: 'Total to Recieve',
      value: <p className="font-normal text-orange-300">{items?.[0]?.to_amount} {items?.[0]?.to_currency?.symbol}</p>
    }
   ]


  return (
    <div className="flex flex-col  justify-start  content-around  items-center drop-shadow-md h-full">
      {/* Main Content here */}
      {showModal && <Modal width={'80vw'} footer={null} open={showModal} onClose={() => setShowModal(!showModal)} closable onCancel={() => setShowModal(!showModal)}>
        <img src={modalImgUrl} />
      </Modal>}
      <>
        <div className=" flex flex-cols content-center text-center justify-between w-full px-4 mt-7">
          <div
            onClick={() => navigate("/transaction")}
            className="text-white text-xl flex flex-cols gap-3 cursor-pointer "
          >
            <IoChevronBack className="text-xl self-center" />
            <p className="self-center">Back</p>
          </div>
          <ProfileSection />
        </div>
        <p className="text-white text-start w-full mt-2 px-4 text-2xl md:w-[80vw]  ">
          Transaction Detail
        </p>

        <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col rounded-b-none">
          <div className="flex flex-col justify-start gap-4 h-full">
            <div className="shadow-lg w-full flex rounded-2xl bg-white p-5">
              <div className="flex gap-4">
                <img
                  src={user?.avatar_url}
                  className="rounded-full h-10 w-10"
                />
                <p className="text-blue-900">{user?.name || `${user?.first_name} ${user?.last_name}`}</p>
              </div>
            </div>
       
            {summaryList?.map((list: any) => {
                return (
                  <div className="">
                    <div className="flex flex-cols justify-between">
                      <p className="font-thin text-gray-500">
                        {list?.title}
                      </p>
                      {list?.value}
                    </div>

                    <hr className="m-1 w-full" />

                  </div>
                )
              })}
                  <p className=" text-gray-500 font-medium">Transaction file</p>
              {uploadedDatas?.map((data: any, index: number) => {
                return (
                  <>
                    <div className="bg-white p-3 shadow-md w-full relative hover:bg-slate-100 cursor-pointer" >
                    

                      <p className="text-gray-500 text-sm m-2 font-light">{data?.original_client_name}</p>
                      {(data?.file?.mime_type == "image/png" || data?.file?.mime_type == "image/jpg") && <img src={data?.file?.url} onClick={() => { setModalImgUrl(data?.file?.url); setShowModal(true) }} />}
                    </div>
                  </>

                )
              })}
          </div>
        </div>
      </>

      <MenuBar />
    </div>
  );
};
export default TransactionDetail;
