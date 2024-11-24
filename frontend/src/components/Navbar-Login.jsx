import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import logo from '../assets/logo.png';
import { SettingsOutline, PersonOutline, MenuOutline, ChevronDownOutline } from 'react-ionicons';

function NavbarLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPerawatanDropdownOpen, setIsPerawatanDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMobileDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const togglePerawatanDropdown = (e) => {
    e.preventDefault();
    setIsPerawatanDropdownOpen(!isPerawatanDropdownOpen);
  };

  const toggleMobileDropdown = (e) => {
    e.preventDefault();
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const toggleProfileDropdown = (e) => {
    e.preventDefault();
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
    setIsPerawatanDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Berhasil logout! Anda akan dialihkan!',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    navigate('/'); // Redirect user to the homepage or login page after logout
  };

  return (
    <nav className="bg-[#E7F0DC] shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/beranda-login">
            <img src={logo} alt="Logo" className="w-25 h-10" />
          </Link>
        </div>

        {/* Navbar links */}
        <div className="flex-grow flex items-center justify-center space-x-6">
          <div className="hidden lg:flex space-x-6">
            <Link to="/beranda-login" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
              Beranda
            </Link>
            <div className="relative">
              <button className="flex items-center px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded cursor-pointer focus:outline-none" onClick={toggleDropdown}>
                Blog/Artikel
                <ChevronDownOutline color={'#000000'} height="24px" width="24px" className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-md border z-10">
                  <ul className="py-2" onClick={closeDropdown}>
                    <li>
                      <Link to="/panduan-login" className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded">
                        Tips Perawatan Tanaman
                      </Link>
                    </li>
                    <li>
                      <Link to="/artikel-penyakit-tanaman-login" className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded">
                        Artikel Penyakit dan Hama
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <button className="flex items-center px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded cursor-pointer focus:outline-none" onClick={togglePerawatanDropdown}>
                Perawatan
                <ChevronDownOutline color={'#000000'} height="24px" width="24px" className="ml-2" />
              </button>
              {isPerawatanDropdownOpen && (
                <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-md border z-10">
                  <ul className="py-2" onClick={closeDropdown}>
                    <li>
                      <Link to="/deteksi-penyakit" className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded">
                        Deteksi Penyakit
                      </Link>
                    </li>
                    <li>
                      <Link to="/histori-tanaman" className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded">
                        History Tanaman
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Link to="/tentang-kami-login" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
              Tentang Kami
            </Link>
          </div>
        </div>

        {/* Navbar icons for desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative flex items-center">
            <button onClick={toggleProfileDropdown} className="text-gray-800 focus:outline-none flex items-center">
              <PersonOutline color="#000000" height="24px" width="24px" />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-10">
                <ul className="py-2">
                  <li>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link to="/personal-setting" className="text-gray-800 flex items-center">
            <SettingsOutline color="#000000" height="24px" width="24px" />
          </Link>
        </div>

        {/* Mobile menu icon with settings and user icons */}
        <div className="lg:hidden flex items-center space-x-4">
          <div className="relative flex items-center">
            <button onClick={toggleProfileDropdown} className="text-gray-800 focus:outline-none flex items-center">
              <PersonOutline color="#000000" height="24px" width="24px" />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-10">
                <ul className="py-2">
                  <li>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link to="/personal-setting" className="text-gray-800 flex items-center">
            <SettingsOutline color="#000000" height="24px" width="24px" />
          </Link>
          <button className="text-gray-800 focus:outline-none flex items-center" onClick={toggleMenu}>
            <MenuOutline color={'#000000'} height="24px" width="24px" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarLogin;
