import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import lockIcon from '../assets/lock-icon.svg';
import userIcon from '../assets/user-icon.svg';
import otherIcon from '../assets/menu-icon.svg';
import kembaliIcon from '../assets/settings-icon.svg';

const FormOtherSettingAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      email: '',
      username: '',
      name: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Hamburger Menu */}
      <button onClick={toggleSidebar} className="lg:hidden p-4 z-30 fixed top-0 left-0" aria-label="Toggle Sidebar">
        {isSidebarOpen ? (
          // Icon Close
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Icon Hamburger
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative lg:w-1/4 w-3/4 bg-gray-100 p-5 h-full transition-transform duration-300 ease-in-out z-20`}>
        <div className="flex flex-col space-y-4">
          <Link to="/admin" className="flex items-center space-x-2">
            <img src={kembaliIcon} alt="Kembali Icon" className="w-5 h-5" />
            <h2 className="text-lg font-bold">Pengaturan</h2>
          </Link>
          <Link to="/admin/personal-setting" className="hover:bg-gray-200 transition-all duration-300 p-3 rounded cursor-pointer flex items-center">
            <img src={userIcon} alt="user" className="inline-block w-5 h-5 mr-2" />
            Pribadi
          </Link>
          <Link to="/admin/password-setting" className="hover:bg-gray-200 transition-all duration-300 p-3 rounded cursor-pointer flex items-center">
            <img src={lockIcon} alt="lock" className="inline-block w-5 h-5 mr-2" />
            Kata Sandi
          </Link>
          <Link to="/admin/other-setting" className="hover:bg-gray-200 transition-all duration-300 p-3 rounded-md bg-white cursor-pointer flex items-center">
            <img src={otherIcon} alt="others" className="inline-block w-5 h-5 mr-2" />
            Lainnya
          </Link>
        </div>
      </aside>

      {/* Form Content */}
      <div className="flex-1 p-8 overflow-y-auto h-full lg:ml-0">
        <h2 className="text-2xl font-bold mb-6">Edit Akun Admin</h2>

        <form className="space-y-4">
          {/* Form Fields */}
          <div>
            <label className="block text-gray-700">Alamat Email*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-700">Username*</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-700">Nama*</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-700">Password*</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-700">Konfirmasi Password*</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none" />
          </div>

          <div className="flex space-x-4">
            <Link to="/admin/other-setting" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all duration-300">
              Simpan
            </Link>
            <button type="button" onClick={handleReset} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-all duration-300">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormOtherSettingAdmin;
