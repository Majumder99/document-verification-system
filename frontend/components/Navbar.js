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
  } = useContext(StateContext);
  return (
    <>
      <div className="w-full flex gap-2 justify-between items-center p-2">
        <div className="flex gap-2">
          <div className="p-4 border rounded-md border-black text-[18px] cursor-pointer">
            <Link href="/">Home</Link>
          </div>
          <div className="p-4 border rounded-md border-black text-[18px] cursor-pointer">
            <Link href="/adminpage">Admin</Link>
          </div>

          <div className="p-4 border rounded-md border-black text-[18px] cursor-pointer">
            <Link href="/studentpage">Student</Link>
          </div>

          {showNav && (
            <div className="p-4 border rounded-md border-black text-[18px] cursor-pointer">
              <Link href="/universitypage">University</Link>
            </div>
          )}
        </div>
        <div
          className="p-4 border rounded-md border-black text-[18px] cursor-pointer"
          onClick={loadProvider}
        >
          Connect to wallet
        </div>
      </div>
    </>
  );
};

export default Navbar;
