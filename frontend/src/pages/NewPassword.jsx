import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import closeUpGreenLeavesNature from '../assets/close-up-green-leaves-nature.png';
import removeRedEye from '../assets/remove-red-eye.svg';
import closeIcon from '../assets/close-icon.svg';
import { useAuthStore } from '../store/FetchDataWithAxios'; // Using your store

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword, isLoading } = useAuthStore(); // Menggunakan store untuk reset password
  const navigate = useNavigate();
  const { token } = useParams();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Password strength validator
  const validatePasswordStrength = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  // Handle form submission and validation
  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Kata sandi tidak cocok.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    if (!validatePasswordStrength(newPassword)) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Kata sandi harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    // Tampilkan modal konfirmasi
    Swal.fire({
      title: 'Konfirmasi Perubahan',
      text: 'Apakah Anda yakin ingin mengubah kata sandi?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Ubah',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        submitNewPassword();
      }
    });
  };

  // Submit new password to the backend
  const submitNewPassword = async () => {
    try {
      await resetPassword(token, newPassword); // Sertakan token sebagai parameter

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Kata sandi berhasil direset!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      navigate('/sign-in'); // Navigasi langsung
    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: err.response?.data?.message || 'Terjadi kesalahan saat mereset kata sandi.',
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
        <div className="hidden md:block w-1/2 p-10">
          <img src={closeUpGreenLeavesNature} alt="Close up green" className="w-full h-auto object-cover rounded-lg" />
        </div>

        {/* Form Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 p-6 md:p-12 lg:p-24 space-y-6">
          <h1 className="text-4xl font-bold text-black">Buat Kata Sandi Baru</h1>
          <p className="text-center text-xl font-semibold text-[#000000cc]">Kata sandi baru Anda harus unik dari yang digunakan sebelumnya.</p>

          {/* New Password Input */}
          <div className="relative w-full max-w-md">
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Kata Sandi Baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-14 pl-4 pr-12 border border-solid border-black rounded-md text-base"
            />
            <img src={removeRedEye} alt="Toggle password visibility" onClick={toggleNewPasswordVisibility} className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6 h-6 cursor-pointer" />
          </div>

          {/* Confirm Password Input */}
          <div className="relative w-full max-w-md">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Konfirmasi Kata Sandi"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-14 pl-4 pr-12 border border-solid border-black rounded-md text-base"
            />
            <img src={removeRedEye} alt="Toggle password visibility" onClick={toggleConfirmPasswordVisibility} className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6 h-6 cursor-pointer" />
          </div>

          <p className="text-center text-base font-semibold text-[#5b5b5b]">Kata sandi harus berisi huruf besar, huruf kecil, angka, dan simbol.</p>

          {/* Reset Password Button */}
          <button
            onClick={handleResetPassword}
            className="w-full max-w-md h-14 bg-tanamanku-2 hover:bg-tanamanku-3 active:bg-tanamanku-4 rounded-lg font-bold text-black"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? 'Mengatur Ulang...' : 'Atur Ulang Kata Sandi'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
