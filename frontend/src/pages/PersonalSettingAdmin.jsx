// PersonalSettingAdmin.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lockIcon from '../assets/lock-icon.svg';
import userIcon from '../assets/user-icon.svg';
import otherIcon from '../assets/menu-icon.svg';
import kembaliIcon from '../assets/settings-icon.svg';
import { useAuthStore } from '../store/FetchDataWithAxios'; // Import Zustand store
import Swal from 'sweetalert2';
import axios from 'axios'; // Pastikan Axios diimpor

const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3000/api/auth' : '/api/auth';

const PersonalSettingAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Gunakan checkAuthAdmin untuk admin
  const { admin, isAdminAuthenticated, checkAuthAdmin, resetAdminState } = useAuthStore();

  useEffect(() => {
    // Jika admin belum terautentikasi, coba cek autentikasi
    if (!isAdminAuthenticated) {
      checkAuthAdmin();
    }
  }, [isAdminAuthenticated, checkAuthAdmin]);

  useEffect(() => {
    if (admin) {
      setEmail(admin.email);
      setName(admin.username);
    }
  }, [admin]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // Validasi input jika diperlukan
    try {
      // Kirim permintaan update ke backend
      const response = await axios.put(`${API_URL}/admin/update-personal-setting`, { email, username: name }, { withCredentials: true });
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Perubahan Tersimpan',
          text: 'Informasi pribadi berhasil diperbarui.',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/admin');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memperbarui',
        text: error.response?.data?.message || 'Terjadi kesalahan saat memperbarui informasi pribadi.',
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Konfirmasi sebelum menghapus akun
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Akun admin akan dihapus secara permanen.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
      });

      if (result.isConfirmed) {
        // Kirim permintaan hapus akun ke backend
        const response = await axios.post(`${API_URL}/admin/delete-account`, {}, { withCredentials: true });
        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Akun Dihapus',
            text: 'Akun admin berhasil dihapus.',
            timer: 2000,
            showConfirmButton: false,
          });
          resetAdminState(); // Reset state admin di Zustand store
          navigate('/sign-in-admin'); // Navigasi ke /sign-in-admin
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menghapus Akun',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menghapus akun.',
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

          <Link to="/admin/personal-setting" className="hover:bg-[#C5D9A4] transition-all duration-300 p-3 rounded-md bg-white cursor-pointer border border-[#6D7E5E]" onClick={() => setIsSidebarOpen(false)}>
            <img src={userIcon} alt="user" className="inline-block w-5 h-5 mr-2" />
            Pribadi
          </Link>

          <Link to="/admin/password-setting" className="hover:bg-[#C5D9A4] transition-all duration-300 p-3 rounded cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
            <img src={lockIcon} alt="lock" className="inline-block w-5 h-5 mr-2" />
            Kata Sandi
          </Link>

          <Link to="/admin/other-setting" className="hover:bg-[#C5D9A4] transition-all duration-300 p-3 rounded cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
            <img src={otherIcon} alt="others" className="inline-block w-5 h-5 mr-2" />
            Lainnya
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto h-full lg:ml-0">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Pribadi</h2>

          <form className="space-y-4" onSubmit={handleSaveChanges}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Nama
              </label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" required />
            </div>

            <div className="mt-6">
              <button type="button" className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg" onClick={handleDeleteAccount}>
                Hapus Akun
              </button>
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

export default PersonalSettingAdmin;
