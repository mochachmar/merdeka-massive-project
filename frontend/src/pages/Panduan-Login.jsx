import React from 'react';
import '../index.css';
import CardPanduan from '../components/CardPanduanLogin';
import tomat from '../assets/tomat.png';
import timun from '../assets/timun.png';
import paprika from '../assets/paprika.png';
import gambarBanner from '../assets/hero-section.png';
import Navbar from '../components/Navbar-Login';
import Footer from '../components/FooterLogin';

const plantsData = [
  {
    name: 'Tomat',
    image: tomat,
    careInstructions: 'Tomat merupakan salah satu tanaman hidroponik yang digemari banyak orang.',
  },
  {
    name: 'Timun',
    image: timun,
    careInstructions: 'Timun merupakan salah satu tanaman hidroponik yang digemari banyak orang.',
  },
  {
    name: 'Paprika',
    image: paprika,
    careInstructions: 'Paprika merupakan salah satu tanaman hidroponik yang digemari banyak orang.',
  },
];

function Panduan() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navbar Section */}
      <Navbar />

      {/* Konten Utama */}
      <main className="flex-grow">
        {/* Header Image Section */}
        <div
          className="relative bg-cover bg-center h-72 flex items-center justify-center"
          style={{
            backgroundImage: `url(${gambarBanner})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-lg"></div>
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
          <CardPanduan plants={plantsData} />
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Panduan;
