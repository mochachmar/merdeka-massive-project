import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/FetchDataWithAxios'; // Menggunakan authStore
import Swal from 'sweetalert2'; // Import SweetAlert2
import closeUpGreenLeavesNature from '../assets/close-up-green-leaves-nature.png';
import removeRedEye from '../assets/remove-red-eye.svg';
import google from '../assets/Google.svg';
import logoFbSimple from '../assets/Logo-fb-simple.svg';

export const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading } = useAuthStore(); // Ambil fungsi dan state dari authStore

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Gunakan login dari authStore

      // Menampilkan toast sukses
      Swal.fire({
        toast: true, // Mode toast
        position: 'top-end', // Posisi kanan atas
        icon: 'success',
        title: 'Berhasil masuk! Anda akan dialihkan!',
        showConfirmButton: false, // Tidak ada tombol OK
        timer: 2000, // Tampilkan selama 1,5 detik
        timerProgressBar: true, // Progress bar
      });

      navigate('/splash-login'); // Navigasi ke halaman berikutnya
    } catch (err) {
      // Menampilkan toast error
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: err.response?.data?.message || 'Login gagal. Silakan coba lagi.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-neutral-50">
      {/* Background Image Fullscreen */}
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
        <div className="flex flex-col items-center w-full md:w-1/2 p-6 md:p-12 lg:p-24 space-y-6">
          <h1 className="text-4xl font-bold text-black text-center">
            Selamat datang <br /> di TanamanKu
          </h1>
          <p className="text-xl font-semibold text-[#000000cc] text-center mt-4">Masuk Akun Anda</p>

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

          {/* Remember Me and Forgot Password Row */}
          <div className="flex items-center justify-between w-full max-w-md mt-4">
            <label className="flex items-center text-sm text-black">
              <input type="checkbox" className="w-4 h-4 rounded border-2 border-black mr-2" />
              Ingat saya selama 30 hari
            </label>
            <a
              href="#"
              className="text-sm text-black underline cursor-pointer hover:text-blue-500"
              onClick={(e) => {
                e.preventDefault();
                navigate('/forgot-password');
              }}
            >
              Lupa Kata Sandi?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            onClick={handleSignIn}
            className={`w-full max-w-md h-14 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-tanamanku-2 hover:bg-tanamanku-3 active:bg-tanamanku-4'} rounded-lg font-bold text-black mt-4`}
            disabled={isLoading}
          >
            {isLoading ? 'Memuat...' : 'Masuk'}
          </button>

          {/* Google and Facebook Sign-In Buttons */}
          <button
            className="flex items-center justify-center gap-2 w-full max-w-md bg-white hover:bg-[#f0f0f0] active:bg-[#e0e0e0] py-2.5 border border-[#565e6d] rounded-lg mt-4"
            onClick={() => {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'info',
                title: 'Sign in dengan Google belum tersedia.',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });
            }}
          >
            <img className="w-5 h-5" alt="Google" src={google} />
            <span className="text-[#565e6d] font-normal text-base">Masuk dengan Google</span>
          </button>
          <button
            className="flex items-center justify-center gap-2 w-full max-w-md bg-white hover:bg-[#f0f0f0] active:bg-[#e0e0e0] py-2.5 border border-[#565e6d] rounded-lg mt-2"
            onClick={() => {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'info',
                title: 'Sign in dengan Facebook belum tersedia.',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });
            }}
          >
            <img className="w-5 h-5" alt="Logo fb simple" src={logoFbSimple} />
            <span className="text-[#565e6d] font-normal text-base">Masuk dengan Facebook</span>
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-base font-semibold text-[#5b5b5b]">
              Belum punya akun?{' '}
              <span className="text-black cursor-pointer hover:text-blue-500" onClick={() => navigate('/sign-up')}>
                Daftar
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
