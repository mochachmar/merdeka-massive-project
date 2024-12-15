import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteAllPlantHistory } from "../services/plantService.js";
import { useLanguage } from "../contexts/LanguageContext";

const MySwal = withReactContent(Swal);

const OtherSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLanguageChange = (e) => {
    toggleLanguage(e.target.value);
  };

  const handleDeleteAllHistory = async () => {
    const result = await MySwal.fire({
      title: t("deleteHistoryConfirmationTitle"),
      text: t("deleteHistoryConfirmationText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("deleteHistoryConfirmationConfirmText"),
      cancelButtonText: t("deleteHistoryConfirmationCancelText"),
    });

    if (result.isConfirmed) {
      try {
        await deleteAllPlantHistory();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: t("historyDeleteSuccess"),
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        // Optional: Refresh data atau redirect
      } catch (error) {
        console.error("Error deleting plant history:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: error.response?.data?.message || t("historyDeleteError"),
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
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
            alt={t("settings")}
            className="w-5 h-5"
          />
          <h2 className="text-lg font-bold">{t("settings")}</h2>
        </Link>
        <ul className="mt-4 space-y-4">
          <li>
            <Link
              to="/personal-setting"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-green-200 transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="./src/assets/user-icon.svg"
                alt={t("personal")}
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
                alt={t("password")}
                className="w-5 h-5"
              />
              <span>{t("password")}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/appearance-setting"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="./src/assets/paint-icon.svg"
                alt={t("appearance")}
                className="w-5 h-5"
              />
              <span>{t("appearance")}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/other-setting"
              className="flex items-center space-x-2 p-2 rounded-md bg-white hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer border border-[#6D7E5E]"
            >
              <img
                src="./src/assets/menu-icon.svg"
                alt={t("other")}
                className="w-5 h-5"
              />
              <span>{t("other")}</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto h-full lg:ml-0">
        <h2 className="text-xl font-bold mb-6">{t("other")}</h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">{t("language")}</label>
          <select
            className="border border-gray-300 rounded-md p-2 w-40"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="id">{t("indonesian")}</option>
            <option value="en">{t("english")}</option>
          </select>
        </div>

        <button
          onClick={handleDeleteAllHistory}
          className="bg-red-100 text-red-500 rounded-md px-4 py-2 mb-8"
        >
          {t("deleteHistory")}
        </button>

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

export default OtherSettings;
