// PasswordSettingAdmin.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lockIcon from '../assets/lock-icon.svg';
import userIcon from '../assets/user-icon.svg';
import otherIcon from '../assets/menu-icon.svg';
import kembaliIcon from '../assets/settings-icon.svg';
import { useAuthStore } from '../store/FetchDataWithAxios'; // Import Zustand store
import Swal from 'sweetalert2'; // Import SweetAlert2
import axios from 'axios'; // Import Axios

const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3000/api/auth' : '/api/auth';

const PasswordSettingAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const { admin, isAdminAuthenticated, checkAuthAdmin, changeAdminPassword } = useAuthStore();

  useEffect(() => {
    // Jika admin belum terautentikasi, cek autentikasi
    if (!isAdminAuthenticated) {
      checkAuthAdmin();
    }
  }, [isAdminAuthenticated, checkAuthAdmin]);

  useEffect(() => {
    if (admin) {
      // Jika diperlukan, Anda bisa mengatur state tambahan di sini
    }
  }, [admin]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!oldPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Semua kolom wajib diisi!',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Kata sandi baru dan konfirmasi tidak cocok!',
      });
      return;
    }

    try {
      // Panggil fungsi di Zustand store untuk mengganti kata sandi
      const response = await changeAdminPassword(oldPassword, newPassword, confirmPassword);
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Kata sandi berhasil diperbarui!',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/admin');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: error.message || 'Terjadi kesalahan saat memperbarui kata sandi.',
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Hamburger Menu */}
      <button onClick={toggleSidebar} className={`lg:hidden p-4 z-30 fixed top-0 ${isSidebarOpen ? 'right-0' : 'left-0'} transition-all duration-300`} aria-label="Toggle Sidebar">
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
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative lg:w-1/4 w-3/4 bg-[#E7F0DC] p-5 h-full transition-transform duration-300 ease-in-out z-20`}>
        <div className="flex flex-col space-y-4">
          <Link to="/admin" className="flex items-center space-x-2">
            <img src={kembaliIcon} alt="Kembali Icon" className="w-5 h-5" />
            <h2 className="text-lg font-bold">Pengaturan</h2>
          </Link>

          <Link to="/admin/personal-setting" className="hover:bg-[#C5D9A4] transition-all duration-300 p-3 rounded cursor-pointer">
            <img src={userIcon} alt="user" className="inline-block w-5 h-5 mr-2" />
            Pribadi
          </Link>

          <Link to="/admin/password-setting" className="hover:bg-[#C5D9A4] transition-all duration-300 p-3 rounded-md bg-white cursor-pointer  border border-[#6D7E5E]">
            <img src={lockIcon} alt="lock" className="inline-block w-5 h-5 mr-2" />
            Kata Sandi
          </Link>

          <Link to="/admin/other-setting" className="hover:bg-[#C5D9A4] transition-all duration-300 p-3 rounded cursor-pointer">
            <img src={otherIcon} alt="others" className="inline-block w-5 h-5 mr-2" />
            Lainnya
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto h-full lg:ml-0">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Kata Sandi</h2>

          <form className="space-y-4" onSubmit={handleSaveChanges}>
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium">
                Kata Sandi Lama
              </label>
              <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium">
                Kata Sandi Baru
              </label>
              <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Konfirmasi Kata Sandi
              </label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" required />
            </div>

            <div className="flex justify-end space-x-4">
              <button type="button" onClick={() => navigate('/admin')} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg">
                Batal
              </button>
              <button type="submit" className="px-4 py-2 bg-[#6D7E5E] text-white rounded-lg border border-[#C4C8AD] hover:bg-[#91A079]">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordSettingAdmin;
