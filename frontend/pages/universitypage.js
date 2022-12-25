import React, { useContext, useEffect } from "react";
import { StateContext } from "../context/StateProvider";
import Link from "next/link";
import Footer from "../components/Footer";

const universitypage = () => {
  const {
    web3,
    setWeb3,
    contract,
    setContract,
    account,
    setAccount,
    getFiles,
    uploadFiles,
    loadProvider,
    file,
    setFile,
    veifyFile,
    verifyAndApply,
    showNav,
    setShowNav,
    showModal,
    setShowModal,
    cid,
    setCid,
    name,
    setName,
    time,
    setTime,
  } = useContext(StateContext);

  return (
    <>
      <button
        onClick={getFiles}
        className="bg-gray-300 w-1/4 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center mb-10"
      >
        Get File
      </button>
      {cid && name && time && (
        <>
          <div className="w-full flex flex-col p-4  bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-[147px]">
            <h5 className="mb-2 text-[30px] text-gray-900 dark:text-white">
              Name : {name}
            </h5>
            <h5 className="mb-2 text-[20px]  text-gray-900 dark:text-white">
              Cid : {cid}
            </h5>
            <p className="mb-5 text-[16px] text-gray-500 sm:text-lg dark:text-gray-400">
              Date : {time}
            </p>
            <Link href={`https://ipfs.io/ipfs/${cid}`}>
              <div className="p-4  flex items-center justify-center border-2 rounded-md border-black text-[18px] w-[15%] cursor-pointer hover:bg-black hover:text-white">
                See File
              </div>
            </Link>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default universitypage;
