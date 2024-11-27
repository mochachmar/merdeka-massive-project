import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import closeUpGreenLeavesNature from '../assets/close-up-green-leaves-nature.png';
import removeRedEye from '../assets/remove-red-eye.svg';
import { useAuthStore } from '../store/FetchDataWithAxios';

export const EmailCreate = () => {
  const navigate = useNavigate();
  const { signup, error: authError, isLoading } = useAuthStore(); // Ambil fungsi dan state dari store

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswordStrength = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input lokal
    if (!name) {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Nama wajib diisi.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
    if (!email || !validateEmail(email)) {
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
    if (!password || !validatePasswordStrength(password)) {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Kata sandi terlalu lemah. Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }

    try {
      await signup(email, password, name);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Akun berhasil dibuat!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      navigate('/email-code');
    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: authError || 'Gagal membuat akun. Silakan coba lagi.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      console.error('Error saat signup:', err);
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
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 p-10">
          <img className="w-full object-cover max-h-[900px] rounded-lg" alt="Close up green" src={closeUpGreenLeavesNature} />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full md:w-1/2 p-6 md:p-12 lg:p-24 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black">Buat Akun Anda</h1>
            <p className="mt-4 text-xl font-semibold text-[#000000cc]">Isi detail Anda untuk membuat akun baru!</p>
          </div>

          {/* Name Input */}
          <input className="w-full max-w-md h-14 pl-4 pr-4 py-2 border border-solid border-black rounded-md text-base" placeholder="Nama" type="text" value={name} onChange={(e) => setName(e.target.value)} />

          {/* Email Input */}
          <input className="w-full max-w-md h-14 pl-4 pr-4 py-2 border border-solid border-black rounded-md text-base" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          {/* Password Input */}
          <div className="relative w-full max-w-md">
            <input
              className="w-full h-14 pl-4 pr-12 py-2 border border-solid border-black rounded-md text-base"
              placeholder="Kata Sandi"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6 h-6 cursor-pointer" alt="Toggle password visibility" src={removeRedEye} onClick={togglePasswordVisibility} />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full max-w-md h-14 bg-tanamanku-2 hover:bg-tanamanku-3 active:bg-tanamanku-4 rounded-lg font-bold text-black" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Selanjutnya'}
          </button>

          {/* Login Link */}
          <p className="text-base font-semibold text-[#5b5b5b]">
            Anda sudah memiliki akun?{' '}
            <span className="text-black cursor-pointer hover:text-blue-500" onClick={() => navigate('/sign-in')}>
              Masuk
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EmailCreate;
