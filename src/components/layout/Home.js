import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <>
      <Navbar />
      <div id="detail">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Home;
