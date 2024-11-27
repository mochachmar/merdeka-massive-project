import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useAuthStore } from '../store/FetchDataWithAxios'; // gunakan useAuthStore dari FetchDataWithAxios.js
import closeUpGreenLeavesNature from '../assets/close-up-green-leaves-nature.png';

export const EmailCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);

  const { verifyEmail, isLoading, error } = useAuthStore();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newCode = [...code];
    newCode[index] = value.slice(-1); // Hanya mengambil karakter terakhir
    setCode(newCode);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerification = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length < 6) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Kode belum lengkap!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      await verifyEmail(verificationCode);

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Email berhasil diverifikasi!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      navigate('/sign-in');
    } catch {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Gagal memverifikasi email.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const handleResendCode = async () => {
    try {
      // Implementasi pengiriman ulang kode
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Kode verifikasi dikirim ulang!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      setTimer(60);
      setResendEnabled(false);
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Gagal mengirim ulang kode.',
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
          <h1 className="text-4xl font-bold text-black text-center">Verifikasi Kode</h1>
          <p className="mt-4 text-xl font-semibold text-[#000000cc] text-center">Masukkan kode verifikasi yang baru saja kami kirimkan ke alamat email Anda.</p>

          {/* Kode Verifikasi Input */}
          <div className="flex justify-center gap-4 mt-4">
            {code.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 border border-solid border-[#9095a0] rounded-[5px] shadow-[0px_4px_4px_#00000040] text-center text-xl font-semibold"
              />
            ))}
          </div>

          {/* Countdown Timer or Resend Button */}
          {resendEnabled ? (
            <button onClick={handleResendCode} className="mt-4 text-blue-500 font-semibold cursor-pointer hover:text-blue-700">
              Kirim ulang kode
            </button>
          ) : (
            <p className="text-base font-normal text-black text-center mt-4">Kirim ulang kode dalam {timer} detik</p>
          )}

          {/* Verify Button */}
          <button onClick={handleVerification} disabled={isLoading} className="w-full max-w-md h-14 bg-tanamanku-2 hover:bg-tanamanku-3 active:bg-tanamanku-4 rounded-lg font-bold text-black mt-4 disabled:opacity-50">
            {isLoading ? 'Memverifikasi...' : 'Verifikasi'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailCode;
