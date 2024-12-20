// components/NavbarAdmin.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminPhoto from '../assets/example-admin-photo.png';
import Logo from '../assets/logo.png';
import DashboardLogo from '../assets/dashboard.svg';
import IconArtikel from '../assets/artikel.svg';
import IconPanduan from '../assets/panduan.svg';
import { LogOutOutline } from 'react-ionicons';
import { ChevronDownOutline } from 'react-ionicons';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useAuthStore } from '../store/FetchDataWithAxios'; // Import Zustand store

export default function NavbarAdmin({ children }) {
  const { isAdminAuthenticated, checkAuthAdmin } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isPanduanOpen, setIsPanduanOpen] = useState(false);
  const [isArtikelOpen, setIsArtikelOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      checkAuthAdmin();
    }
  }, [isAdminAuthenticated, checkAuthAdmin]);

  const { logoutAdmin } = useAuthStore(); // Ekstrak logoutAdmin dari store

  const handleLogout = async () => {
    try {
      await logoutAdmin(); // Panggil fungsi logoutAdmin dari store
      // Tampilkan notifikasi sukses menggunakan SweetAlert2
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Berhasil logout!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      navigate('/sign-in-admin'); // Arahkan ke halaman login admin
    } catch (error) {
      // Tampilkan notifikasi error menggunakan SweetAlert2
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Gagal logout. Silakan coba lagi.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className={`flex ${isOpen ? 'ml-64' : ''} transition-all`}>
      {/* Sidebar */}
      <nav className={`fixed top-0 left-0 h-full w-64 bg-[#E7F0DC] p-6 shadow-lg z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
        <div className="flex items-center justify-center mb-8">
          <NavLink to="/admin" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? ' text-gray-900 font-semibold' : 'text-gray-800 hover:bg-[#C5D9A4]'}`} onClick={() => setIsOpen(false)}>
            <img src={Logo} alt="Logo" className="h-10" />
          </NavLink>
        </div>
        <ul className="flex flex-col space-y-5">
          <li>
            <NavLink to="/admin" className={({ isActive }) => `flex items-center px-4 py-3 rounded ${isActive ? ' text-gray-900 font-semibold' : 'text-gray-800 hover:bg-[#C5D9A4]'}`} onClick={() => setIsOpen(false)}>
              <img src={DashboardLogo} alt="Dashboard" className="h-6 w-6 mr-2" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <button onClick={() => setIsArtikelOpen(!isArtikelOpen)} className="flex items-center justify-between w-full text-left px-4 py-3 text-gray-800 hover:bg-[#C5D9A4] rounded">
              <div className="flex items-center">
                <img src={IconArtikel} alt="Artikel" className="h-6 w-6 mr-2" />
                <span>Artikel</span>
              </div>
              <ChevronDownOutline
                color="#4A5568" // Sesuaikan warna ikon
                height="24px"
                width="24px"
                style={{
                  transform: isArtikelOpen ? 'rotate(180deg)' : 'rotate(0deg)', // Rotasi ikon saat toggle
                  transition: 'transform 0.3s ease', // Animasi rotasi
                }}
              />
            </button>

            {isArtikelOpen && (
              <ul className="pl-8">
                <li>
                  <NavLink to="/admin/card-artikel" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-[#C5D9A4] text-gray-900 font-semibold' : 'text-gray-800 hover:bg-[#C5D9A4]'}`} onClick={() => setIsOpen(false)}>
                    Card Artikel
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button onClick={() => setIsPanduanOpen(!isPanduanOpen)} className="flex items-center justify-between w-full text-left px-4 py-3 text-gray-800 hover:bg-[#C5D9A4] rounded">
              <div className="flex items-center">
                <img src={IconPanduan} alt="Panduan" className="h-6 w-6 mr-2" />
                <span>Panduan</span>
              </div>
              <ChevronDownOutline
                color="#4A5568" // Sesuaikan warna ikon
                height="24px"
                width="24px"
                style={{
                  transform: isPanduanOpen ? 'rotate(180deg)' : 'rotate(0deg)', // Rotasi ikon saat open/close
                  transition: 'transform 0.3s ease', // Animasi rotasi
                }}
              />
            </button>
            {isPanduanOpen && (
              <ul className="pl-8">
                <li>
                  <NavLink to="/admin/card-panduan" className={({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-[#C5D9A4] text-gray-900 font-semibold' : 'text-gray-800 hover:bg-[#C5D9A4]'}`} onClick={() => setIsOpen(false)}>
                    Card Panduan
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => {
                handleLogout(); // Panggil fungsi handleLogout
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-[#C5D9A4] rounded flex items-center"
            >
              <LogOutOutline
                color="#4A5568"
                height="24px"
                width="24px"
                style={{ marginRight: '8px' }} // Tambahkan jarak antara ikon dan teks
              />
              Keluar
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#F5F5F5] shadow-md">
          {/* Burger Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-700 focus:outline-none">
            {isOpen ? <span className="text-2xl font-semibold">✕</span> : <span className="text-2xl font-semibold">☰</span>}
          </button>

          {/* Admin Greeting and Photo */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/admin/personal-setting')}>
            <span className="text-gray-700 text-base font-medium">Hi, Admin</span>
            <img className="rounded-full w-10 h-10 border border-gray-300" src={AdminPhoto} alt="Admin" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
