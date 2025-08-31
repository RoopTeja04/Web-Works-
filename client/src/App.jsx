import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Services from './components/Services'
import OurWork from "./components/OurWork"
import Contact from './components/Contact'
import Logo from './images/webworks_logo-01.png' 

const App = () => {
  return (
    <>

      <nav className="bg-gradient-to-r from-yellow-50 via-yellow-100 to-white p-4 shadow-md h-20 flex justify-between items-center px-20">
        <Link
          to="/"
        >
          <img src={Logo} alt='' 
            className='h-10 ml-4'
          />
        </Link>

        <div className="flex space-x-10 items-center font-medium text-lg text-gray-800">
          <Link
            to="/"
            className="relative hover:text-black transition duration-300 tracking-wider after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="relative hover:text-black transition duration-300 tracking-wider after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            Services
          </Link>
          <Link
            to="/our-work"
            className="relative hover:text-black transition duration-300 tracking-wider after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            Our Work
          </Link>
          <Link
            to="/contact"
            className="relative hover:text-black transition duration-300 tracking-wider after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App