import React, { useContext } from "react";
import Link from "next/link";
import { StateContext } from "../context/StateProvider";

const Navbar = () => {
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
    providerShow,
    setProviderShow,
  } = useContext(StateContext);
  return (
    <>
      <div className="w-full mb-4 shadow-md mx-auto p-3">
        <div className="w-full flex gap-2 items-center p-2">
          <div className="max-w-[20%]">
            <img src="/logo1.png" alt="" className="w-[14rem] h-[6rem]" />
          </div>
          <div className="flex justify-between items-center flex-1">
            <div className="flex gap-2">
              <Link href="/">
                <div className="p-4 border rounded-md border-black text-[18px] cursor-pointer hover:bg-black hover:text-white">
                  Home
                </div>
              </Link>
              <Link href="/adminpage">
                <div className="p-4 border rounded-md border-black text-[18px] cursor-pointer hover:bg-black hover:text-white">
                  Admin
                </div>
              </Link>
              <Link href="/studentpage">
                <div
                  onClick={() => setShowNav(false)}
                  className="p-4 border rounded-md border-black text-[18px] cursor-pointer hover:bg-black hover:text-white"
                >
                  Student
                </div>
              </Link>

              {showNav && (
                <Link href="/universitypage">
                  <div className="p-4 border rounded-md border-black text-[18px] cursor-pointer hover:bg-black hover:text-white">
                    University
                  </div>
                </Link>
              )}
            </div>
            <div
              className="p-4 border rounded-md bg-black text-white text-[18px] cursor-pointer"
              onClick={loadProvider}
            >
              Connect to wallet
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
