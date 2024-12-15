// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import closeUpGreenLeavesNature from '../assets/close-up-green-leaves-nature.png';

// export const ErrorPage503 = () => {
//   // Tentukan waktu countdown dalam detik (misalnya 1 tahun, 2 bulan, 3 minggu, 5 hari)
//   // 1 tahun = 365 * 24 * 60 * 60 detik
//   // 1 bulan = 30 * 24 * 60 * 60 detik
//   // 1 minggu = 7 * 24 * 60 * 60 detik
//   // 1 hari = 24 * 60 * 60 detik
//   const [countdown, setCountdown] = useState(
//     0 * 365 * 24 * 60 * 60 + // 1 tahun
//       0 * 30 * 24 * 60 * 60 + // 2 bulan
//       0 * 7 * 24 * 60 * 60 + // 3 minggu
//       1 * 24 * 60 * 60 // 5 hari
//   );

//   const navigate = useNavigate(); // Inisialisasi useNavigate

//   // Fungsi untuk mengonversi detik ke format yang lebih komprehensif (tahun, bulan, minggu, hari, jam, menit, detik)
//   const formatTime = (timeInSeconds) => {
//     const years = Math.floor(timeInSeconds / (365 * 24 * 60 * 60));
//     const months = Math.floor((timeInSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
//     const weeks = Math.floor((timeInSeconds % (30 * 24 * 60 * 60)) / (7 * 24 * 60 * 60));
//     const days = Math.floor((timeInSeconds % (7 * 24 * 60 * 60)) / (24 * 60 * 60));
//     const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;

//     let timeString = '';
//     if (years > 0) timeString += `${years} tahun `;
//     if (months > 0) timeString += `${months} bulan `;
//     if (weeks > 0) timeString += `${weeks} minggu `;
//     if (days > 0) timeString += `${days} hari `;
//     if (hours > 0) timeString += `${hours} jam `;
//     if (minutes > 0) timeString += `${minutes} menit `;
//     if (seconds > 0) timeString += `${seconds} detik`;

//     return timeString.trim();
//   };

//   // Hitung mundur menggunakan useEffect
//   useEffect(() => {
//     if (countdown === 0) {
//       navigate('/beranda'); // Arahkan ke halaman /beranda setelah countdown selesai
//       return;
//     }

//     // Set interval untuk mengurangi waktu mundur setiap detik
//     const timer = setInterval(() => {
//       setCountdown((prev) => prev - 1);
//     }, 1000);

//     // Hapus interval ketika komponen di-unmount atau ketika hitungan mundur selesai
//     return () => clearInterval(timer);
//   }, [countdown, navigate]); // Tambahkan navigate dalam dependensi

//   return (
//     <div className="relative min-h-screen w-full flex items-center justify-center bg-neutral-50">
//       {/* Background Image Fullscreen */}
//       <div
//         className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
//         style={{
//           backgroundImage: `url(${closeUpGreenLeavesNature})`,
//           filter: 'brightness(0.85)', // Menambahkan filter untuk gelap pada background
//         }}
//       ></div>

//       {/* Content Section */}
//       <div className="relative flex flex-col md:flex-row max-w-[1440px] w-full min-h-screen bg-neutral-50 items-center z-10">
//         {/* Image Section */}
//         <div className="hidden md:block md:w-1/2 p-10">
//           <img className="w-full object-cover max-h-[900px] rounded-lg" alt="Close up green" src={closeUpGreenLeavesNature} />
//         </div>

//         {/* Error Message Section */}
//         <div className="flex flex-col items-center w-full md:w-1/2 p-6 md:p-12 lg:p-24 space-y-6">
//           <div className="text-center">
//             <h1 className="text-5xl font-bold text-red-600">503 - Layanan tidak tersedia</h1>
//             <p className="mt-4 text-xl font-semibold text-[#000000cc]">Layanan saat ini tidak tersedia. Coba lagi nanti.</p>
//             {countdown > 0 && <p className="mt-4 text-xl font-semibold text-[#000000cc]">Coba lagi dalam {formatTime(countdown)}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ErrorPage503;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext"; // Assuming you have a language context
import closeUpGreenLeavesNature from "../assets/close-up-green-leaves-nature.png";

export const ErrorPage503 = () => {
  // Set target date for countdown (example: 17 December 2024)
  const targetDate = new Date("2024-12-17T00:00:00");

  // Function to calculate the remaining countdown time in seconds
  const calculateCountdown = () => {
    const now = new Date();
    const timeDifference = targetDate - now; // Get time difference in milliseconds
    return Math.max(timeDifference / 1000, 0); // Convert to seconds and ensure it's not negative
  };

  const [countdown, setCountdown] = useState(calculateCountdown);

  const navigate = useNavigate(); // Initialize navigate function
  const { t } = useLanguage(); // Access translation function from context

  // Function to convert countdown time (in seconds) into a more readable format (days, hours, minutes, seconds)
  const formatTime = (timeInSeconds) => {
    const days = Math.floor(timeInSeconds / (24 * 60 * 60)); // Calculate days
    const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / 3600); // Calculate hours
    const minutes = Math.floor((timeInSeconds % 3600) / 60); // Calculate minutes
    const seconds = Math.floor(timeInSeconds % 60); // Calculate seconds

    let timeString = "";
    if (days > 0) timeString += `${days} ${t("days")} `;
    if (hours > 0) timeString += `${hours} ${t("hours")} `;
    if (minutes > 0) timeString += `${minutes} ${t("minutes")} `;
    if (seconds >= 0) timeString += `${seconds} ${t("seconds")}`;

    return timeString.trim();
  };

  // Countdown logic using useEffect
  useEffect(() => {
    if (countdown === 0) {
      navigate("/"); // Navigate to homepage after countdown ends
      return;
    }

    // Set interval to update countdown every second
    const timer = setInterval(() => {
      setCountdown(calculateCountdown); // Update countdown
    }, 1000);

    // Cleanup the interval when the component unmounts or countdown ends
    return () => clearInterval(timer);
  }, [countdown, navigate]); // Re-run when countdown or navigate changes

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-neutral-50">
      {/* Background Image Fullscreen */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${closeUpGreenLeavesNature})`,
          filter: "brightness(0.85)", // Adding a dark filter over the background image
        }}
      ></div>

      {/* Content Section */}
      <div className="relative flex flex-col md:flex-row max-w-[1440px] w-full min-h-screen bg-neutral-50 items-center z-10">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 p-10">
          <img
            className="w-full object-cover max-h-[900px] rounded-lg"
            alt="Close up green"
            src={closeUpGreenLeavesNature}
          />
        </div>

        {/* Error Message Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 p-6 md:p-12 lg:p-24 space-y-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-red-600">
              {t("error503Title")}
            </h1>
            <p className="mt-4 text-xl font-semibold text-[#000000cc]">
              {t("error503Message")}
            </p>
            {countdown > 0 && (
              <p className="mt-4 text-xl font-semibold text-[#000000cc]">
                {t("retryIn")} {formatTime(countdown)}...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage503;
