import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png"; // Make sure this path is correct
import { useLanguage } from "../contexts/LanguageContext"; // Import the useLanguage hook

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage(); // Use the language hook to access the translation function

  return (
    <footer style={{ backgroundColor: "#F5F5F5" }} className="text-black py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Logo and Copyright */}
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/beranda-login">
            <img src={logo} alt="Logo" className="h-10 w-auto mr-3" />
          </Link>
          <span className="text-xl font-semibold"></span>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-sm hidden md:block">
            {t("footerCopyright")} {currentYear}. {t("footerRights")}
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4 mb-4 md:mb-0">
          <li>
            <Link to="/beranda-login" className="hover:text-gray-600">
              {t("home")}
            </Link>
          </li>
          <li>
            <Link to="/panduan-login" className="hover:text-gray-600">
              {t("blogArticle")}
            </Link>
          </li>
          <li>
            <Link to="/deteksi-penyakit" className="hover:text-gray-600">
              {t("care")}
            </Link>
          </li>
          <li>
            <Link to="/tentang-kami-login" className="hover:text-gray-600">
              {t("aboutUs")}
            </Link>
          </li>
        </ul>

        {/* Responsive Copyright Text */}
        <p className="text-sm text-center md:hidden">
          {t("footerCopyright")} {currentYear}. {t("footerRights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
