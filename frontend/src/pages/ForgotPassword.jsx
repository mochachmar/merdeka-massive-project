import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useAuthStore } from '../store/FetchDataWithAxios';
import closeUpGreenLeavesNature from '../assets/close-up-green-leaves-nature.png';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { forgotPassword, isLoading, error: globalError } = useAuthStore();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input email
    if (!email) {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Email wajib diisi.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }

    if (!validateEmail(email)) {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Format email tidak valid.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }

    try {
      // Kirim permintaan reset password
      await forgotPassword(email);

      // Tampilkan notifikasi sukses
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Tautan reset kata sandi telah dikirim.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      // Arahkan pengguna ke halaman `new-password`
      navigate('/new-password', { state: { email } });
    } catch (err) {
      // Tampilkan notifikasi error
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: globalError || 'Gagal mengirim tautan reset kata sandi.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-neutral-50">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${closeUpGreenLeavesNature})`,
          filter: 'brightness(0.85)',
        }}
      ></div>

      {/* Content Section */}
      <div className="relative flex flex-col md:flex-row max-w-[1440px] w-full min-h-screen bg-neutral-50 items-center z-10">
        <div className="hidden md:block md:w-1/2 p-10">
          <img className="w-full object-cover max-h-[900px] rounded-lg" alt="Close up green" src={closeUpGreenLeavesNature} />
        </div>

        <div className="flex flex-col items-center w-full md:w-1/2 p-6 md:p-12 lg:p-24 space-y-6">
          <h1 className="text-4xl font-bold text-black text-center">Setel Ulang Kata Sandi Anda</h1>
          <p className="text-xl font-semibold text-[#000000cc] text-center mt-4">Jangan khawatir! Silakan masukkan email yang terkait dengan akun Anda.</p>

          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <input className="w-full h-14 pl-4 pr-4 py-2 border border-solid border-black rounded-md text-base" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <button type="submit" className="w-full h-14 bg-tanamanku-2 hover:bg-tanamanku-3 active:bg-tanamanku-4 rounded-lg font-bold text-black mt-4" disabled={isLoading}>
              {isLoading ? 'Mengirim...' : 'Submit'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-base font-semibold text-[#5b5b5b]">
              Sudah ingat kata sandi Anda?{' '}
              <span className="text-black cursor-pointer hover:text-blue-500" onClick={() => navigate('/sign-in')}>
                Masuk
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
