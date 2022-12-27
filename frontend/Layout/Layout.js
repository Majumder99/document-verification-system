import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <Navbar />
      <div>
        <main>{children}</main>
      </div>
      
    </div>
  );
};

export default Layout;
