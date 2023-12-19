import React from 'react';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'; // Import FaLinkedin

const Footer = () => {
  return (
    <footer className="text-gray-500 -sm py-6 mt-10">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mb-2">
          &copy; 2023 BizonByte | All Rights Reserved
        </div>
        <address className="mb-2">
          Amsterdam, The Netherlands
        </address>
        <div className="flex space-x-4">
          <a href="https://twitter.com/bizonbyte" target="_blank" className="text-gray-700 hover:text-blue-500 transition-colors duration-300" aria-label="Twitter">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com/bizonbyte" target="_blank" className="text-gray-700 hover:text-pink-500 transition-colors duration-300" aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
          <a href="https://github.com/bizonbyte" target="_blank" className="text-gray-700 hover:text-white transition-colors duration-300" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
          {/* Add LinkedIn Icon */}
          <a href="https://linkedin.com/company/bizonbyte" target="_blank" className="text-gray-700 hover:text-blue-700 transition-colors duration-300" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
