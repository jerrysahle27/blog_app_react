import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <div id="detail">
        <Outlet />
      </div>
      <div className="pt-36">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
