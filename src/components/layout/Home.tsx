import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PostsList from "../posts/PostsList";
import PostHeader from "../posts/PostHeader";

const Home = () => {
  return (
    <>
      <Navbar />
      <PostHeader />
      <PostsList />
      <Footer />
    </>
  );
};

export default Home;
