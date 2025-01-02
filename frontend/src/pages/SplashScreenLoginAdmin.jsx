// SplashScreenLoginAdmin.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoTanamanKu from '../assets/logo2.png';
import { useAuthStore } from '../store/FetchDataWithAxios'; // Import Zustand store

const SplashScreenLoginAdmin = () => {
  const navigate = useNavigate();
  const { isAdminAuthenticated, isAdminLoading } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAdminAuthenticated) {
        navigate('/admin'); // Arahkan ke dashboard admin setelah login
      } else {
        navigate('/sign-in-admin'); // Jika belum terautentikasi, arahkan ke login admin
      }
    }, 2000); // Durasi splash screen (2 detik)

    return () => clearTimeout(timer); // Bersihkan timer saat komponen di-unmount
  }, [isAdminAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-tanamanku-2">
      <img className="w-1/2 max-w-[300px] md:max-w-[400px] lg:max-w-[500px] animate-fade-in" alt="Logo TANAMANKU" src={logoTanamanKu} />
    </div>
  );
};

export default SplashScreenLoginAdmin;
