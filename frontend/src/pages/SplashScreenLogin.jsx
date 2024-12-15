// SplashScreenLogin.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoTanamanKu from '../assets/logo2.png';
import { useAuthStore } from '../store/FetchDataWithAxios';
import Swal from 'sweetalert2';

const SplashScreenLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth); // Pastikan metode setAuth ada di store

  useEffect(() => {
    const processAuth = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (token) {
        try {
          await setAuth(token);
          Swal.fire({
            icon: 'success',
            title: 'Berhasil Masuk!',
            text: 'Anda akan dialihkan ke halaman utama.',
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            navigate('/beranda-login', { replace: true });
          });
        } catch (error) {
          console.error('Error setting auth:', error);
          Swal.fire({
            icon: 'error',
            title: 'Gagal Masuk!',
            text: 'Terjadi kesalahan saat memproses autentikasi.',
          }).then(() => {
            navigate('/error-page-401', { replace: true });
          });
        }
      } else {
        navigate('/sign-in', { replace: true });
      }
    };

    processAuth();
  }, [location, navigate, setAuth]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-tanamanku-2">
      <img className="w-1/2 max-w-[300px] md:max-w-[400px] lg:max-w-[500px] animate-fade-in" alt="Logo TANAMANKU" src={logoTanamanKu} />
    </div>
  );
};

export default SplashScreenLogin;
