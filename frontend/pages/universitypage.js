import React, { useContext, useEffect } from "react";
import { StateContext } from "../context/StateProvider";
import Link from "next/link";

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
        className="bg-gray-300 w-1/4 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center"
      >
        Get File
      </button>
      {cid && name && time && (
        <div className="w-full flex p-4 items-center justify-between text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {cid}
            </h5>
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {name}
            </h5>
            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
              {time}
            </p>
          </div>
          <Link href={`https://ipfs.io/ipfs/${cid}`}>See file</Link>
        </div>
      )}
    </>
  );
};

// bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu.ipfs.w3s.link /
// youareanonsense.jpg;

export default universitypage;
