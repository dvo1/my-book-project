import React from 'react'
import Navbar from './components/landing-page/navbar'
import Hero from './components/landing-page/hero'
import Search from './components/landing-page/search'

const HomePage = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <Search query=''/>

    </>
  )
}

export default HomePage