import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lockIcon from '../assets/lock-icon.svg';
import userIcon from '../assets/user-icon.svg';
import otherIcon from '../assets/menu-icon.svg';
import kembaliIcon from '../assets/settings-icon.svg';

const PersonalSettingAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState('admin123@gmail.com');
  const [name, setName] = useState('Moch Achmar');
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    console.log('Personal info updated');
    navigate('/admin');
  };

  const handleDeleteAccount = () => {
    console.log('Account deleted');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

          <Link to="/admin/personal-setting" className="hover:bg-gray-200 transition-all duration-300 p-3 rounded-md bg-white cursor-pointer">
            <img src={userIcon} alt="user" className="inline-block w-5 h-5 mr-2" />
            Pribadi
          </Link>

          <Link to="/admin/password-setting" className="hover:bg-gray-200 transition-all duration-300 p-3 rounded cursor-pointer">
            <img src={lockIcon} alt="lock" className="inline-block w-5 h-5 mr-2" />
            Kata Sandi
          </Link>

          <Link to="/admin/other-setting" className="hover:bg-gray-200 transition-all duration-300 p-3 rounded cursor-pointer">
            <img src={otherIcon} alt="others" className="inline-block w-5 h-5 mr-2" />
            Lainnya
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto h-full lg:ml-0">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Pribadi</h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Nama
              </label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </div>

            <div className="mt-6">
              <button type="button" className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg" onClick={handleDeleteAccount}>
                Hapus Akun
              </button>
            </div>

            <div className="flex justify-between mt-6">
              <button type="button" onClick={() => navigate('/admin')} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg">
                Batal
              </button>
              <button type="button" onClick={handleSaveChanges} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalSettingAdmin;