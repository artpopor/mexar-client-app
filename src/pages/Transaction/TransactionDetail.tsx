import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import MenuBar from "../../components/MenuBar";
import { IoChevronBack } from "react-icons/io5";
import ProfileSection from "../ProfileSection";
import "../../components/components.css";
import { useGetTransactionDetailQuery } from "../../services/apiStore";
import { useParams } from "react-router-dom";
import { Modal, Spin } from "antd";

import draftProfile from "../../assets/draftProfile.png";
const TransactionDetail = () => {
  const navigate = useNavigate();
  const [modalImgUrl, setModalImgUrl] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  // const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const access_token = localStorage.getItem("access_token");
  const { transactionId } = useParams();
  const { data, error, isLoading } = useGetTransactionDetailQuery({
    token: access_token,
    transactionId: transactionId,
  });
  const status = data?.data?.status;
  const items = data?.data?.items;
  const uploadedDatas = data?.data?.files;
  const user = data?.data.entity;
  const timeStampToLocaltime = (timestamp: string) => {
    const date = new Date(timestamp);
    const bangkokOffset = 7 * 60;
    const localOffset = date.getTimezoneOffset();
    const totalOffset = bangkokOffset + localOffset;
    const bangkokDate = new Date(date.getTime() + totalOffset * 60 * 1000);
    const year = bangkokDate.getFullYear();
    const month = (bangkokDate.getMonth() + 1).toString().padStart(2, "0");
    const day = bangkokDate.getDate().toString().padStart(2, "0");
    const hours = bangkokDate.getHours().toString().padStart(2, "0");
    const minutes = bangkokDate.getMinutes().toString().padStart(2, "0");
    const seconds = bangkokDate.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };
  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error]);
  let statusColor;

  if (status === "completed") {
    statusColor = "text-green-400";
  } else if (status === "lead") {
    statusColor = "text-orange-400";
  } else if (status === "pending") {
    statusColor = "text-yellow-400";
  } else {
    statusColor = "text-blue-300";
  }
  const summaryList = [
    {
      title: "Transaction :",
      value: (
        <p className="font-normal text-gray-500">
          #{items?.[0]?.transaction_id}
        </p>
      ),
    },
    {
      title: "status :",
      value: <p className={statusColor}>{status}</p>,
    },
    {
      title: "Date Issued :",
      value: <p>{timeStampToLocaltime(items?.[0]?.created_at)}</p>,
    },
    {
      title: "Date Due :",
      value: <p>{timeStampToLocaltime(data?.data?.due_at)}</p>,
    },
  ];

  return (
    <div className="flex flex-col  justify-start  content-around  items-center drop-shadow-md min-h-screen">
      {/* Main Content here */}
      {showModal && (
        <Modal
          width={"80vw"}
          footer={null}
          open={showModal}
          onClose={() => setShowModal(!showModal)}
          closable
          onCancel={() => setShowModal(!showModal)}
        >
          <img src={modalImgUrl} />
        </Modal>
      )}
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

        <div className="bg-[#F6FAFF] mt-2 p-5 w-full md:w-[80vw] rounded-3xl h-full flex flex-col rounded-b-none min-h-screen">
          {(!isLoading && (
            <div className="flex flex-col justify-start gap-4 h-full">
              <div className="shadow-lg w-full flex rounded-2xl bg-white p-5">
                <div className="flex gap-4">
                  <img
                    src={user?.avatar_url || draftProfile}
                    className="rounded-full h-10 w-10"
                  />
                  <div className="flex flex-col text-gray-500">
                    <p className="text text-[#2d4da3] !w-full">
                      {user?.first_name || user?.middle_name || user?.last_name
                        ? `${user?.first_name || ""} ${
                            user?.middle_name || ""
                          } ${user?.last_name || ""}`.trim()
                        : user?.name}
                    </p>
                    <p className="text-sm">{user?.entity_type}</p>
                  </div>
                </div>
              </div>

              {summaryList?.map((list: any) => {
                return (
                  <div key={list?.title}>
                    <div className="flex flex-cols justify-between">
                      <p className="font-thin text-gray-500">{list?.title}</p>
                      {list?.value}
                    </div>

                    <hr className="m-1 w-full" />
                  </div>
                );
              })}
              <div className="w-full p-4 bg-white shadow-lg rounded-lg">
                <div className="w-full flex justify-between">
                  <p>From :</p>
                  <p className="text-[#56AEF5]">
                    {items?.[0]?.from_amount} {items?.[0]?.from_currency?.code}
                  </p>
                </div>
                <div className="w-full flex justify-end">
                  <p className="text-sm text-gray-400 ">
                    Buy rate {items?.[0]?.from_currency_buy_rate}
                  </p>
                </div>
              </div>
              {/* <CgArrowsExchangeAltV className="w-full text-2xl text-gray-400" /> */}

              <div className="w-full p-4 bg-white shadow-lg rounded-lg">
                <div className="w-full flex justify-between">
                  <p>To :</p>
                  <p className="text-orange-300">
                    {items?.[0]?.to_amount} {items?.[0]?.to_currency?.code}
                  </p>
                </div>
                <div className="w-full flex justify-end">
                  <p className="text-sm text-gray-400">
                    Sell rate {items?.[0]?.to_currency_sell_rate}
                  </p>
                </div>
              </div>

              {uploadedDatas?.length > 0 && (
                <p className="text-gray-500 font-medium">Transaction file</p>
              )}
              <div className="grid grid-cols-2 gap-2">
                {uploadedDatas?.map((data: any) => {
                  console.log(data);
                  return (
                    <div
                      key={data?.id}
                      className="bg-white p-3 shadow-md w-full relative hover:bg-slate-100 cursor-pointer"
                    >
                      <p className="text-gray-500 text-sm m-2 font-light">
                        {data?.original_client_name}
                      </p>
                      {data?.file?.mime_type?.includes('image') && (
                        <img
                          src={data?.file?.url}
                          onClick={() => {
                            setModalImgUrl(data?.file?.url);
                            setShowModal(true);
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )) || <Spin className="self-center w-full !h-full" size="large" />}
        </div>
      </>

      <MenuBar />
    </div>
  );
};
export default TransactionDetail;
