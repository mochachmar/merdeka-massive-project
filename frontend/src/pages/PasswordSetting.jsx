import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import removeRedEye from "../assets/remove-red-eye.svg"; // Ensure icon path is correct
import Swal from "sweetalert2"; // Import SweetAlert2
import { useLanguage } from "../contexts/LanguageContext"; // Import useLanguage hook

const PasswordSetting = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State for current password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { t } = useLanguage(); // Use the language hook

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword); // Toggle visibility for current password
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword); // Toggle visibility for new password
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle visibility for confirm password
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("passwordMismatch"),
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    try {
      const response = await axios.put("/api/auth/update-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: t("passwordUpdated"),
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: error.response?.data?.message || t("passwordUpdateError"),
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
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
              className="flex items-center space-x-2 p-2 rounded-md bg-white hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer border border-[#6D7E5E]"
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
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer"
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
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto h-full lg:ml-0">
        <h2 className="text-xl font-semibold mb-6">{t("password")}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">{t("currentPassword")}</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                className="w-full p-2 border rounded-md mt-1"
                placeholder="*************"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <img
                className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                alt={t("togglePasswordVisibility")}
                src={removeRedEye}
                onClick={toggleCurrentPasswordVisibility}
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">{t("newPassword")}</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                className="w-full p-2 border rounded-md mt-1"
                placeholder="*************"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <img
                className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                alt={t("togglePasswordVisibility")}
                src={removeRedEye}
                onClick={toggleNewPasswordVisibility}
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">{t("confirmPassword")}</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="w-full p-2 border rounded-md mt-1"
                placeholder="*************"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <img
                className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                alt={t("togglePasswordVisibility")}
                src={removeRedEye}
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="border rounded-md px-4 py-2"
              onClick={() =>
                setFormData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                })
              }
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="bg-[#6D7E5E] text-white rounded-md px-4 py-2 border border-[#C4C8AD] hover:bg-[#91A079]"
            >
              {t("saveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordSetting;
