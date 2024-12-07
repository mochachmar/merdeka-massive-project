import React, { useState, useEffect, useRef } from 'react';
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

  const dropdownRef = useRef(null);
  const perawatanDropdownRef = useRef(null);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMobileDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  const togglePerawatanDropdown = (e) => {
    e.preventDefault();
    setIsPerawatanDropdownOpen((prev) => !prev);
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

  // Tutup dropdown ketika klik di luar elemen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (perawatanDropdownRef.current && !perawatanDropdownRef.current.contains(event.target)) {
        setIsPerawatanDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="flex items-center px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
                Blog/Artikel
                <ChevronDownOutline height="24px" width="24px" className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-md border z-10">
                  <ul className="py-2">
                    <li>
                      <Link to="/panduan-login" className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded">
                        Tips Perawatan Tanaman
                      </Link>
                    </li>
                    <hr className="border-t border-gray-400 my-1" />
                    <li>
                      <Link to="/artikel-penyakit-tanaman-login" className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded">
                        Artikel Penyakit dan Hama
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Dropdown Perawatan */}
            <div className="relative" ref={perawatanDropdownRef}>
              <button onClick={togglePerawatanDropdown} className="flex items-center px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
                Perawatan
                <ChevronDownOutline height="24px" width="24px" className="ml-2" />
              </button>
              {isPerawatanDropdownOpen && (
                <div className="absolute left-0 mt-2 w-58 bg-white shadow-lg rounded-md border z-10">
                  <ul className="py-2">
                    <li>
                      <Link to="/deteksi-penyakit" className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded">
                        Deteksi Penyakit
                      </Link>
                    </li>
                    <hr className="border-t border-gray-400 my-1" />
                    <li>
                      <Link to="/histori-tanaman" className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded">
                        Histori Tanaman
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
        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-[#E7F0DC] p-4">
            <ul className="flex flex-col space-y-5">
              <li>
                <Link to="/beranda-login" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
                  Beranda
                </Link>
              </li>
              <li>
                <button onClick={toggleMobileDropdown} className="flex justify-between w-full px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded focus:outline-none">
                  Blog/Artikel
                  <ChevronDownOutline color={'#000000'} height="24px" width="24px" />
                </button>
                {isMobileDropdownOpen && (
                  <ul className="mt-2 space-y-2 ml-4">
                    <li>
                      <Link to="/panduan-login" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded" onClick={closeDropdown}>
                        Tips Perawatan Tanaman
                      </Link>
                    </li>
                    <li>
                      <Link to="/artikel-penyakit-tanaman-login" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded" onClick={closeDropdown}>
                        Artikel Penyakit dan Hama
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button onClick={togglePerawatanDropdown} className="flex justify-between w-full px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
                  Perawatan
                  <ChevronDownOutline color={'#000000'} height="24px" width="24px" />
                </button>
                {isPerawatanDropdownOpen && (
                  <ul className="mt-2 space-y-2 ml-4">
                    <li>
                      <Link to="/deteksi-penyakit" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded" onClick={closeDropdown}>
                        Deteksi Penyakit
                      </Link>
                    </li>
                    <li>
                      <Link to="/histori-tanaman" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded" onClick={closeDropdown}>
                        History Tanaman
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/tentang-kami-login" className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarLogin;
