import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PostsList from "../posts/PostsList";
import PostsHeader from "../posts/PostsHeader";

const Home = () => {
  return (
    <>
      <Navbar />
      <PostsHeader />
      <PostsList />
      <Footer />
    </>
  );
};

export default Home;
