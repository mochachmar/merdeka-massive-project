import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PersonalSetting = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
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
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative lg:w-1/4 w-3/4 bg-green-100 p-4 sm:p-6 h-full transition-transform duration-300 ease-in-out z-20`}>
        <Link to="/beranda-login" className="flex items-center space-x-2">
          <img
            src="./src/assets/settings-icon.svg" // Add the icon path here
            alt="Pengaturan Icon"
            className="w-5 h-5"
          />
          <h2 className="text-lg font-bold">Pengaturan</h2>
        </Link>
        <ul className="mt-4 space-y-4">
          <li>
            <Link to="/personal-setting" className="flex items-center space-x-2 p-2 rounded-md bg-white hover:bg-green-200 transition duration-300 ease-in-out cursor-pointer">
              <img src="./src/assets/user-icon.svg" alt="Pribadi Icon" className="w-5 h-5" />
              <span>Pribadi</span>
            </Link>
          </li>
          <li>
            <Link to="/password-setting" className="flex items-center space-x-2 p-2 rounded-md hover:bg-green-200 transition duration-300 ease-in-out cursor-pointer">
              <img src="./src/assets/lock-icon.svg" alt="Kata Sandi Icon" className="w-5 h-5" />
              <span>Kata Sandi</span>
            </Link>
          </li>
          <li>
            <Link to="/appearance-setting" className="flex items-center space-x-2 p-2 rounded-md hover:bg-green-200 transition duration-300 ease-in-out cursor-pointer">
              <img src="./src/assets/paint-icon.svg" alt="Tampilan Icon" className="w-5 h-5" />
              <span>Tampilan</span>
            </Link>
          </li>
          <li>
            <Link to="/other-setting" className="flex items-center space-x-2 p-2 rounded-md hover:bg-green-200 transition duration-300 ease-in-out cursor-pointer">
              <img src="./src/assets/menu-icon.svg" alt="Lainnya Icon" className="w-5 h-5" />
              <span>Lainnya</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto h-full lg:ml-0">
        <h2 className="text-xl font-semibold mb-6">Pribadi</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input type="email" className="w-full p-2 border rounded-md mt-1" placeholder="mochachmar.web7@infinitelearningstudent.id" readOnly />
          </div>
          <div>
            <label className="block font-medium">Nama</label>
            <input type="text" className="w-full p-2 border rounded-md mt-1" defaultValue="Moch Achmar" />
          </div>
          <div className="mt-6">
            <h3 className="font-medium text-red-600">Hapus Akun</h3>
            <p className="text-gray-500 mb-2">Hapus akun Anda dan semua datanya</p>
            <button type="button" className="bg-red-100 text-red-600 border border-red-600 rounded-md px-4 py-2">
              Hapus Akun
            </button>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <button type="button" className="border rounded-md px-4 py-2">
              Batal
            </button>
            <button type="submit" className="bg-green-700 text-white rounded-md px-4 py-2">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalSetting;
