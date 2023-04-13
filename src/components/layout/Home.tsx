import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import PostsList from '../posts/PostsList'

const Home = () => {
  return (
    <>
      <Navbar/>
       <PostsList/>
      <Footer/>
    </>
  )
}

export default Home