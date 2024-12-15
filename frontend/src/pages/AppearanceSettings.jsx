import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext"; // Import useLanguage hook

const AppearanceSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useLanguage(); // Use the language hook

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden p-4 z-30 fixed top-0 ${
          isSidebarOpen ? "right-0" : "left-0"
        } transition-all duration-300`}
        aria-label={t("toggleSidebar")}
      >
        {isSidebarOpen ? (
          // Icon Close
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Icon Hamburger
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative lg:w-1/4 w-3/4 bg-[#E7F0DC] p-4 sm:p-6 h-full transition-transform duration-300 ease-in-out z-20`}
      >
        <Link to="/beranda-login" className="flex items-center space-x-2">
          <img
            src="./src/assets/settings-icon.svg"
            alt={t("settingsIcon")}
            className="w-5 h-5"
          />
          <h2 className="text-lg font-bold">{t("settings")}</h2>
        </Link>
        <ul className="mt-4 space-y-4">
          <li>
            <Link
              to="/personal-setting"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="./src/assets/user-icon.svg"
                alt={t("personalIcon")}
                className="w-5 h-5"
              />
              <span>{t("personal")}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/password-setting"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="./src/assets/lock-icon.svg"
                alt={t("passwordIcon")}
                className="w-5 h-5"
              />
              <span>{t("password")}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/appearance-setting"
              className="flex items-center space-x-2 p-2 rounded-md bg-white hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer border border-[#6D7E5E]"
            >
              <img
                src="./src/assets/paint-icon.svg"
                alt={t("appearanceIcon")}
                className="w-5 h-5"
              />
              <span>{t("appearance")}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/other-setting"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="./src/assets/menu-icon.svg"
                alt={t("otherIcon")}
                className="w-5 h-5"
              />
              <span>{t("other")}</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto h-full lg:ml-0">
        <h2 className="text-xl font-bold mb-6">{t("appearance")}</h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">{t("theme")}</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer">
              <img
                src="../src/assets/light-icon.png"
                alt={t("lightTheme")}
                className="mb-2"
              />
              <span>{t("light")}</span>
            </div>
            <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer">
              <img
                src="./src/assets/dark-icon.png"
                alt={t("darkTheme")}
                className="mb-2"
              />
              <span>{t("dark")}</span>
            </div>
            <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer">
              <img
                src="./src/assets/black-icon.png"
                alt={t("blackTheme")}
                className="mb-2"
              />
              <span>{t("black")}</span>
            </div>
            <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer">
              <img
                src="./src/assets/auto-icon.png"
                alt={t("autoTheme")}
                className="mb-2"
              />
              <span>{t("auto")}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-gray-600 mb-2">{t("fontSize")}</label>
          <select className="border border-gray-300 rounded-md p-2 w-40">
            <option>16px</option>
            <option>18px</option>
            <option>20px</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="border border-gray-300 text-gray-700 rounded-md px-4 py-2">
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="bg-[#6D7E5E] text-white rounded-md px-4 py-2 border border-[#C4C8AD] hover:bg-[#91A079]"
          >
            {t("saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
