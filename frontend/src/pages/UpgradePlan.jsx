import React from 'react';
import Navbar from '../components/Navbar-Login';
import Footer from '../components/FooterLogin';
import CardUpgradePlan from '../components/CardUpgradePlan';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UpgradePlan = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="flex flex-col min-h-screen w-full m-0 p-0">
      {/* Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center flex-grow p-4 md:p-14 bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-8 md:mb-12 text-center">Upgrade your plan</h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-3xl">
          {/* Free Plan */}
          <CardUpgradePlan
            title="Free"
            price="Rp.0 /bulan"
            description="Temukan bagaimana deteksi AI dapat membantu dalam aktivitas harianmu dengan akun Free."
            buttonText="Rencana koneksi Anda"
            sub="Dengan Free, Anda bisa menikmati:"
            features={['Akses terbatas ke deteksi AI hanya 5 kali', 'Proses deteksi yang cepat dan akurat', 'Dukungan free kapan saja']}
            buttonAction={() => alert('Anda memilih Free Plan!')} // Tetap alert untuk Free Plan
          />

          {/* Pro Plan */}
          <CardUpgradePlan
            title="Pro"
            price="Rp.25.000 /bulan"
            description="Nikmati deteksi AI tanpa batas untuk mempermudah aktivitas harianmu dengan akun Pro."
            buttonText="Dapatkan Pro"
            sub="Dengan Pro, Anda bisa menikmati:"
            features={['Akses tanpa batas ke deteksi AI', 'Proses deteksi yang lebih cepat dan akurat', 'Dukungan premium kapan saja']}
            buttonAction={() => navigate('/payment')} // Navigasi ke Payment
          />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default UpgradePlan;
