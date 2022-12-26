import React, { useContext, useEffect } from "react";
import { StateContext } from "../context/StateProvider";
import Modal from "../components/Modal";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const studentpage = () => {
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
    showModal,
    setShowModal,
    showLoader,
    setShowLoader,
    showErrModal,
    setShowErrModal,
    setShowNav,
  } = useContext(StateContext);
  return (
    <>
      {<Loader showLoader={showLoader} />}
      <div className="flex items-center justify-center text-[50px]">
        <h1>Verify File</h1>
      </div>
      <div className="flex justify-center mt-8 mb-[125px]">
        <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50  pb-[30px]">
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">
              File Upload
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Attach a file
                  </p>
                </div>
                <input
                  type="file"
                  className="opacity-0"
                  multiple
                  onChange={(e) => setFile(e.target.files)}
                  accept="application/pdf"
                />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={veifyFile}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center"
            >
              <span>Verify</span>
            </button>
            <button
              onClick={verifyAndApply}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center"
            >
              <span>Verify & Apply</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {showModal && <Modal title={"File verified"} />}
      {showErrModal && <ErrorModal title={"File not verified"} />}
    </>
  );
};

export default studentpage;
