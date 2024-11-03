import React, { useState } from "react";
import logo from "../assets/Logo.png";
import { SettingsOutline, PersonOutline, MenuOutline, ChevronDownOutline } from "react-ionicons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMobileDropdownOpen(false); // Close mobile dropdown when toggling menu
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileDropdown = (e) => {
    e.preventDefault();
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const closeDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  };

  return (
    <nav className="bg-[#E7F0DC] shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-25 h-10" />
        </div>

        {/* Navbar links */}
        <div className="flex-grow flex items-center justify-center space-x-6">
          <div className="hidden lg:flex space-x-6">
            <a href="#beranda" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
              Beranda
            </a>
            <div className="relative">
              <button
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded cursor-pointer focus:outline-none"
                onClick={toggleDropdown}
              >
                Blog/Artikel
                <ChevronDownOutline color={"#000000"} height="24px" width="24px" className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-md border z-10">
                  <ul className="py-2" onClick={closeDropdown}>
                    <li>
                      <a
                        href="#Tips-Perawatan-Tanaman"
                        className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded"
                      >
                        Tips Perawatan Tanaman
                      </a>
                    </li>
                    <li>
                      <a
                        href="#Artikel-Penyakit-Tanaman"
                        className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded"
                      >
                        Artikel Penyakit dan Hama
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <a href="#perawatan" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
              Perawatan
            </a>
            <a href="#tentangkami" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
              Tentang Kami
            </a>
          </div>
        </div>

        {/* Navbar icons for desktop */}
        <div className="hidden lg:flex items-center space-x-10">
          <a href="#user" className="text-gray-800">
            <PersonOutline color="#000000" height="24px" width="24px" />
          </a>
          <a href="#settings" className="text-gray-800">
            <SettingsOutline color="#000000" height="24px" width="24px" />
          </a>
        </div>

        {/* Mobile menu icon with settings and user icons */}
        <div className="lg:hidden flex items-center space-x-4">
          <a href="#user" className="text-gray-800">
            <PersonOutline color="#000000" height="24px" width="24px" />
          </a>
          <a href="#settings" className="text-gray-800">
            <SettingsOutline color="#000000" height="24px" width="24px" />
          </a>
          <button className="text-gray-800 focus:outline-none" onClick={toggleMenu}>
            <MenuOutline color={"#000000"} height="24px" width="24px" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#E7F0DC] p-4">
          <ul className="flex flex-col space-y-5">
            <li>
              <a href="#beranda" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
                Beranda
              </a>
            </li>
            <li>
              <button
                onClick={toggleMobileDropdown}
                className="flex justify-between w-full px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded focus:outline-none"
              >
                Blog/Artikel
                <ChevronDownOutline color={"#000000"} height="24px" width="24px" />
              </button>
              {isMobileDropdownOpen && (
                <ul className="mt-2 space-y-2 ml-4">
                  <li>
                    <a
                      href="#Tips-Perawatan-Tanaman"
                      className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded"
                      onClick={closeDropdown}
                    >
                      Tips Perawatan Tanaman
                    </a>
                  </li>
                  <li>
                    <a
                      href="#Artikel-Penyakit-Tanaman"
                      className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded"
                      onClick={closeDropdown}
                    >
                      Artikel Penyakit dan Hama
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <a href="#perawatan" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
                Perawatan
              </a>
            </li>
            <li>
              <a href="#tentangkami" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
                Tentang Kami
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
