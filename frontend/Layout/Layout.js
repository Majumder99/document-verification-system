import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <Navbar />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
