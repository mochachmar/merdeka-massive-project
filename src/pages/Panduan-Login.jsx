import React from 'react';
import '../index.css';
import CardPanduan from '../components/CardPanduanLogin';
import tomat from '../assets/tomat.png';
import timun from '../assets/timun.png';
import paprika from '../assets/paprika.png';
import blog from '../assets/blog.png';
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
        <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${blog})` }}>
          <div className="absolute inset-0 bg-black opacity-20 backdrop-blur-lg"></div>
          <h1
            className="text-white text-center font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 
                       text-lg sm:text-xl md:text-2xl lg:text-3xl px-4"
          >
            Temukan artikel dan perawatan untuk <br />
            meningkatkan kualitas tanaman Anda!
          </h1>
        </div>

        {/* Main Content */}
        <header className="text-center mb-8 mt-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">Tips Perawatan Tanaman</h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2">Panduan perawatan pada tanaman hidroponik</p>
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
