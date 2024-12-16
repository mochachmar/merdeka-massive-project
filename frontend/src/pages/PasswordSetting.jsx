import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import removeRedEye from "../assets/remove-red-eye.svg"; // Pastikan path ikon benar
import Swal from "sweetalert2"; // Import SweetAlert2

const PasswordSetting = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State untuk kata sandi lama
  const [showNewPassword, setShowNewPassword] = useState(false); // State untuk kata sandi baru
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State untuk konfirmasi kata sandi
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword); // Toggle visibility untuk kata sandi lama
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword); // Toggle visibility untuk kata sandi baru
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle visibility untuk konfirmasi kata sandi
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
        title: "Gagal!",
        text: "Kata sandi baru dan konfirmasi tidak cocok!",
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
        title: "Kata sandi berhasil diubah!",
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
        title: "Gagal!",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan saat mengubah kata sandi.",
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
        className="lg:hidden p-4 z-30 fixed top-0 left-0"
        aria-label="Toggle Sidebar"
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
        } lg:translate-x-0 fixed lg:relative lg:w-1/4 w-3/4 bg-[#E7F0DC] p-4 sm:p-6 h-full transition-transform duration-300 ease-in-out z-20 text-black`}
      >
        <Link to="/beranda-login" className="flex items-center space-x-2">
          <img
            src="./src/assets/settings-icon.svg"
            alt="Pengaturan Icon"
            className="w-5 h-5"
          />
          <h2 className="text-lg font-bold">Pengaturan</h2>
        </Link>
        <ul className="mt-4 space-y-4">
          <li>
            <Link
              to="/personal-setting"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="./src/assets/user-icon.svg"
                alt="Pribadi Icon"
                className="w-5 h-5"
              />
              <span>Pribadi</span>
            </Link>
          </li>
          <li>
            <Link
              to="/password-setting"
              className="flex items-center space-x-2 p-2 rounded-md bg-white hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer border border-[#6D7E5E]"
            >
              <img
                src="./src/assets/lock-icon.svg"
                alt="Kata Sandi Icon"
                className="w-5 h-5"
              />
              <span>Kata Sandi</span>
            </Link>
          </li>

          <li>
            <Link
              to="/appearance-setting"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="./src/assets/paint-icon.svg"
                alt="Tampilan Icon"
                className="w-5 h-5"
              />
              <span>Tampilan</span>
            </Link>
          </li>
          <li>
            <Link
              to="/other-setting"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="./src/assets/menu-icon.svg"
                alt="Lainnya Icon"
                className="w-5 h-5"
              />
              <span>Lainnya</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto h-full lg:ml-0">
        <h2 className="text-xl font-semibold mb-6">Kata Sandi</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Kata Sandi Lama</label>
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
                alt="Toggle password visibility"
                src={removeRedEye}
                onClick={toggleCurrentPasswordVisibility}
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Kata Sandi Baru</label>
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
                alt="Toggle password visibility"
                src={removeRedEye}
                onClick={toggleNewPasswordVisibility}
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Konfirmasi Kata Sandi</label>
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
                alt="Toggle password visibility"
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
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#6D7E5E] text-white rounded-md px-4 py-2 border border-[#C4C8AD] hover:bg-[#91A079]"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordSetting;
