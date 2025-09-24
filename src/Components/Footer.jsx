import React from 'react';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import logo2 from '../assets/images/logo2.png';

function Footer() {
  return (
    <footer className="bg-[#ffb07c] text-black py-6">
  <div className="max-w-7xl mx-auto flex flex-col w-full">
    
    {/* Top Section */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left w-full">
      {/* Logo + Tagline */}
      <div className="flex flex-col items-center md:items-start">
        <img src={logo2} alt="Logo" className="mx-auto md:mx-0" />
        <p className="mt-2">Natural ingredients.<br />Paraben free</p>
      </div>

     <div></div>

      {/* Contact */}
      <div className="flex flex-col items-center md:items-center lg:mr-50">
        <h3 className="font-semibold mb-2">Contact Us</h3>
        <p>meskincare@gmail.com</p>
      </div>

      

      {/* Connect */}
      <div className="flex flex-col items-center md:items-end">
        <h3 className="font-semibold mb-2">Connect</h3>
        <div className="flex space-x-4">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
      </div>
    </div>

    {/* Bottom Links */}
    <div className="mt-6 pt-3 flex flex-col md:flex-row justify-center md:justify-between items-center text-sm gap-2 w-full">
      <a href="#" className="hover:underline">Refund Policy</a>
      <a href="#" className="hover:underline">Shipping Policy</a>
      <a href="#" className="hover:underline">Privacy Policy</a>
      <a href="#" className="hover:underline">Terms of service</a>
    </div>
  </div>
</footer>


  )
}

export default Footer