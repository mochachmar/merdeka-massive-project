import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import closeUpGreenLeavesNature from '../assets/close-up-green-leaves-nature.png';

export const ErrorPage502 = () => {
  const [countdown, setCountdown] = useState(10); // Set waktu hitungan mundur (10 detik)
  const [buttonEnabled, setButtonEnabled] = useState(false); // Set tombol aktif setelah hitungan mundur selesai
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Fungsi untuk merefresh halaman
  const handleRefresh = () => {
    window.location.reload(); // Refresh halaman
  };

  // Hitung mundur menggunakan useEffect
  useEffect(() => {
    if (countdown === 0) {
      setButtonEnabled(true); // Aktifkan tombol ketika hitungan mundur selesai
      // navigate('/beranda'); // Aktifkan ini jika server sudah membaik
      return;
    }

    // Set interval untuk mengurangi waktu mundur setiap detik
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Hapus interval ketika komponen di-unmount atau ketika hitungan mundur selesai
    return () => clearInterval(timer);
  }, [countdown, navigate]); // Tambahkan navigate dalam dependensi

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-neutral-50">
      {/* Background Image Fullscreen */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${closeUpGreenLeavesNature})`,
          filter: 'brightness(0.85)', // Menambahkan filter untuk gelap pada background
        }}
      ></div>

      {/* Content Section */}
      <div className="relative flex flex-col md:flex-row max-w-[1440px] w-full min-h-screen bg-neutral-50 items-center z-10">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 p-10">
          <img className="w-full object-cover max-h-[900px] rounded-lg" alt="Close up green" src={closeUpGreenLeavesNature} />
        </div>

        {/* Error Message Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 p-6 md:p-12 lg:p-24 space-y-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-red-600">502 - Bad Gateway</h1>
            <p className="mt-4 text-xl font-semibold text-[#000000cc]">Server sedang mengalami masalah. Coba lagi nanti.</p>
            {countdown > 0 && <p className="mt-4 text-xl font-semibold text-[#000000cc]">Coba lagi dalam {countdown} detik</p>}
          </div>

          {/* Button to refresh the page */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={!buttonEnabled} // Disable tombol sampai countdown selesai
            className={`w-full max-w-md h-14 ${buttonEnabled ? 'bg-tanamanku-2 hover:bg-tanamanku-3 active:bg-tanamanku-4' : 'bg-gray-300 cursor-not-allowed'} rounded-lg font-bold text-black mt-6`}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage502;
