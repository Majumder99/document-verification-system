import React, { useContext } from "react";
import Link from "next/link";
import { StateContext } from "../context/StateProvider";

const Navbar = () => {
  const { loadProvider } = useContext(StateContext);
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

          <div className="p-4 border rounded-md border-black text-[18px] cursor-pointer">
            <Link href="/universitypage">University</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
