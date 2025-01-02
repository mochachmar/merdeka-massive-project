// OtherSettings.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { deleteAllPlantHistory } from '../services/plantService.js'; // Pastikan Anda memiliki fungsi ini

const MySwal = withReactContent(Swal);

const OtherSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDeleteAllHistory = async () => {
    const result = await MySwal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Apakah anda yakin untuk menghapus semua riwayat identifikasi tanaman?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus semua!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await deleteAllPlantHistory();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Berhasil menghapus semua riwayat identifikasi tanaman!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        // Optional: Refresh data atau redirect
      } catch (error) {
        console.error('Error deleting plant history:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: error.response?.data?.message || 'Terjadi kesalahan saat menghapus semua riwayat identifikasi tanaman!.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
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
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative lg:w-1/4 w-3/4 bg-[#E7F0DC] p-4 sm:p-6 h-full transition-transform duration-300 ease-in-out z-20`}>
        <Link to="/beranda-login" className="flex items-center space-x-2">
          <img src="./src/assets/settings-icon.svg" alt="Pengaturan Icon" className="w-5 h-5" />
          <h2 className="text-lg font-bold">Pengaturan</h2>
        </Link>
        <ul className="mt-4 space-y-4">
          <li>
            <Link to="/personal-setting" className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer">
              <img src="./src/assets/user-icon.svg" alt="Pribadi Icon" className="w-5 h-5" />
              <span>Pribadi</span>
            </Link>
          </li>
          <li>
            <Link to="/password-setting" className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer">
              <img src="./src/assets/lock-icon.svg" alt="Kata Sandi Icon" className="w-5 h-5" />
              <span>Kata Sandi</span>
            </Link>
          </li>
          <li>
            <Link to="/appearance-setting" className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer">
              <img src="./src/assets/paint-icon.svg" alt="Tampilan Icon" className="w-5 h-5" />
              <span>Tampilan</span>
            </Link>
          </li>
          <li>
            <Link to="/other-setting" className="flex items-center space-x-2 p-2 rounded-md bg-white hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer border border-[#6D7E5E]">
              <img src="./src/assets/menu-icon.svg" alt="Lainnya Icon" className="w-5 h-5" />
              <span>Lainnya</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto h-full lg:ml-0">
        <h2 className="text-xl font-bold mb-6">Lainnya</h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Bahasa</label>
          <select className="border border-gray-300 rounded-md p-2 w-40">
            <option>Bahasa Indonesia</option>
            <option>English</option>
            {/* Tambahkan opsi bahasa lain jika diperlukan */}
          </select>
        </div>

        <button onClick={handleDeleteAllHistory} className="bg-red-100 text-red-500 rounded-md px-4 py-2 mb-8">
          Hapus Riwayat Tanaman
        </button>

        <div className="flex justify-end space-x-4">
          <button className="border border-gray-300 text-gray-700 rounded-md px-4 py-2">Batal</button>
          <button type="submit" className="bg-[#6D7E5E] text-white rounded-md px-4 py-2 border border-[#C4C8AD] hover:bg-[#91A079]">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherSettings;
