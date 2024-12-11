import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import CardPanduan from '../components/CardPanduanLogin';
import gambarBanner from '../assets/hero-section.png';
import Navbar from '../components/Navbar-Login';
import Footer from '../components/FooterLogin';

function Panduan() {
  const [plants, setPlants] = useState([]); // State untuk menyimpan data tanaman

  useEffect(() => {
    // Mengambil data dari API backend
    axios
      .get('http://localhost:3000/api/guides') // URL API backend
      .then((response) => {
        setPlants(response.data); // Menyimpan data yang diterima ke state
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat mengambil data:', error);
      });
  }, []); // Hanya sekali saat komponen pertama kali dimuat

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navbar Section */}
      <Navbar />

      {/* Konten Utama */}
      <main className="flex-grow">
        {/* Header Image Section */}
        <div className="relative bg-cover bg-center h-72 flex items-center justify-center" style={{ backgroundImage: `url(${gambarBanner})` }}>
          <div className="absolute inset-0  opacity-50 "></div>
          <h1 className="text-white text-center text-3xl font-semibold relative z-10">
            Temukan artikel dan perawatan untuk <br />
            meningkatkan kualitas tanaman anda!
          </h1>
        </div>

        {/* Main Content */}
        <header className="text-center mb-8 mt-6">
          <h1 className="text-center text-4xl font-bold py-4">Tips Perawatan Tanaman</h1>
          <p className="text-center text-xl font-regular">Panduan perawatan pada tanaman hidroponik</p>
        </header>

        {/* Card Section */}
        <div className="flex flex-wrap justify-center w-full">
          <CardPanduan plants={plants} />
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Panduan;
