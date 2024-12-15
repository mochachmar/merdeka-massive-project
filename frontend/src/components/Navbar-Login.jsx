import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import logo from "../assets/logo.png";
import {
  SettingsOutline,
  PersonOutline,
  MenuOutline,
  ChevronDownOutline,
} from "react-ionicons";
import { useLanguage } from "../contexts/LanguageContext"; // Import useLanguage

function NavbarLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isPerawatanDropdownOpen, setIsPerawatanDropdownOpen] = useState(false);
  const [isMobilePerawatanDropdownOpen, setIsMobilePerawatanDropdownOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage(); // Hook untuk mengambil fungsi terjemahan

  let dropdownTimeout; // Timeout untuk dropdown Blog/Artikel
  let perawatanTimeout; // Timeout untuk dropdown Perawatan

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMobileDropdownOpen(false);
    setIsMobilePerawatanDropdownOpen(false);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const togglePerawatanDropdown = () => {
    setIsMobilePerawatanDropdownOpen(!isMobilePerawatanDropdownOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: t("logoutSuccess"), // Menggunakan terjemahan
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    navigate("/"); // Redirect user to the homepage or login page after logout
  };

  const toggleProfileDropdown = (e) => {
    e.preventDefault();
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeDropdown = () => {
    setIsMobileDropdownOpen(false);
    setIsMobilePerawatanDropdownOpen(false);
  };

  const handleMouseEnterDropdown = () => {
    clearTimeout(dropdownTimeout);
    setIsDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // Delay 300ms
  };

  const handleMouseEnterPerawatan = () => {
    clearTimeout(perawatanTimeout);
    setIsPerawatanDropdownOpen(true);
  };

  const handleMouseLeavePerawatan = () => {
    perawatanTimeout = setTimeout(() => {
      setIsPerawatanDropdownOpen(false);
    }, 300); // Delay 300ms
  };

  return (
    <nav className="bg-[#E7F0DC] shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/beranda-login">
            <img src={logo} alt="Logo" className="w-25 h-10" />
          </Link>
        </div>

        {/* Navbar links (Desktop) */}
        <div className="flex-grow flex items-center justify-center space-x-6">
          <div className="hidden lg:flex space-x-6">
            <Link
              to="/beranda-login"
              className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded"
            >
              {t("home")} {/* Menggunakan terjemahan */}
            </Link>

            <div
              className="relative"
              onMouseEnter={handleMouseEnterDropdown}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button className="flex items-center px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded cursor-pointer focus:outline-none">
                {t("blogArticle")} {/* Menggunakan terjemahan */}
                <ChevronDownOutline
                  color={"#000000"}
                  height="24px"
                  width="24px"
                  className="ml-2"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-md border z-10">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/panduan-login"
                        className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded"
                      >
                        {t("plantCareTips")} {/* Menggunakan terjemahan */}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/artikel-penyakit-tanaman-login"
                        className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded"
                      >
                        {t("diseasesArticles")} {/* Menggunakan terjemahan */}
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={handleMouseEnterPerawatan}
              onMouseLeave={handleMouseLeavePerawatan}
            >
              <button className="flex items-center px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded cursor-pointer focus:outline-none">
                {t("care")} {/* Menggunakan terjemahan */}
                <ChevronDownOutline
                  color={"#000000"}
                  height="24px"
                  width="24px"
                  className="ml-2"
                />
              </button>
              {isPerawatanDropdownOpen && (
                <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-md border z-10">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/deteksi-penyakit"
                        className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded"
                      >
                        {t("diseaseDetection")} {/* Menggunakan terjemahan */}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/histori-tanaman"
                        className="block px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded"
                      >
                        {t("plantHistory")} {/* Menggunakan terjemahan */}
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Link
              to="/tentang-kami-login"
              className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded"
            >
              {t("aboutUs")} {/* Menggunakan terjemahan */}
            </Link>
          </div>
        </div>

        {/* Navbar icons for desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative flex items-center">
            <button
              onClick={toggleProfileDropdown}
              className="text-gray-800 focus:outline-none flex items-center"
            >
              <PersonOutline color="#000000" height="24px" width="24px" />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-10">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded"
                    >
                      {t("logout")} {/* Menggunakan terjemahan */}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link
            to="/personal-setting"
            className="text-gray-800 flex items-center"
          >
            <SettingsOutline color="#000000" height="24px" width="24px" />
          </Link>
        </div>

        {/* Mobile menu icon */}
        <div className="lg:hidden flex items-center space-x-4">
          <div className="relative flex items-center">
            <button
              onClick={toggleProfileDropdown}
              className="text-gray-800 focus:outline-none flex items-center"
            >
              <PersonOutline color="#000000" height="24px" width="24px" />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-10">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#E7F0DC] rounded"
                    >
                      {t("logout")} {/* Menggunakan terjemahan */}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link
            to="/personal-setting"
            className="text-gray-800 flex items-center"
          >
            <SettingsOutline color="#000000" height="24px" width="24px" />
          </Link>
          <button
            className="text-gray-800 focus:outline-none flex items-center"
            onClick={toggleMenu}
          >
            <MenuOutline color={"#000000"} height="24px" width="24px" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#E7F0DC] p-4">
          <ul className="flex flex-col space-y-5">
            <li>
              <Link
                to="/beranda-login"
                className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded"
              >
                {t("home")} {/* Menggunakan terjemahan */}
              </Link>
            </li>
            <li>
              <button
                onClick={toggleMobileDropdown}
                className="flex justify-between w-full px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded focus:outline-none"
              >
                {t("blogArticle")} {/* Menggunakan terjemahan */}
                <ChevronDownOutline
                  color={"#000000"}
                  height="24px"
                  width="24px"
                />
              </button>
              {isMobileDropdownOpen && (
                <ul className="mt-2 space-y-2 ml-4">
                  <li>
                    <Link
                      to="/panduan-login"
                      className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded"
                      onClick={closeDropdown}
                    >
                      {t("plantCareTips")} {/* Menggunakan terjemahan */}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/artikel-penyakit-tanaman-login"
                      className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded"
                      onClick={closeDropdown}
                    >
                      {t("diseasesArticles")} {/* Menggunakan terjemahan */}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={togglePerawatanDropdown}
                className="flex justify-between w-full px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded"
              >
                {t("care")} {/* Menggunakan terjemahan */}
                <ChevronDownOutline
                  color={"#000000"}
                  height="24px"
                  width="24px"
                />
              </button>
              {isMobilePerawatanDropdownOpen && (
                <ul className="mt-2 space-y-2 ml-4">
                  <li>
                    <Link
                      to="/deteksi-penyakit"
                      className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded"
                      onClick={closeDropdown}
                    >
                      {t("diseaseDetection")} {/* Menggunakan terjemahan */}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/histori-tanaman"
                      className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded"
                      onClick={closeDropdown}
                    >
                      {t("plantHistory")} {/* Menggunakan terjemahan */}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/tentang-kami-login"
                className="block px-4 py-2 text-gray-800 hover:bg-[#C5D9A4] rounded"
              >
                {t("aboutUs")} {/* Menggunakan terjemahan */}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavbarLogin;
