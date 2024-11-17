import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import { ArrowBackOutline, LeafOutline, ScanOutline } from 'react-ionicons';
import tomat from '../assets/tomat.jpg';
import Navbar from '../components/Navbar-Login';
import Footer from '../components/FooterLogin';

const IdentifikasiAI = () => {
  return (
    <div className="flex flex-col min-h-screen w-full m-0 p-0">
      {/* Navbar */}
      <Navbar />

      <div className="flex-grow relative mt-4 mx-auto w-full max-w-4xl px-4">
        {' '}
        {/* Added px-4 here */}
        <div className="flex justify-between items-center mb-4">
          <Link to="/deteksi-penyakit" className="flex items-center text-black font-semibold text-sm ml-4">
            <ArrowBackOutline className="mr-5" color="black" height="50px" width="30px" />
            Kembali
          </Link>
          <Link to="/histori-tanaman" className="text-black font-semibold text-sm mr-4">
            Tanaman Saya
          </Link>
        </div>
        {/* Centered Image */}
        <div className="flex justify-center mb-4">
          <img src={tomat} alt="Tomato Plant" className="mb-4 min-w-56 max-h-56 h-auto mx-4" />
        </div>
        {/* Cards Layout with additional padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {' '}
          {/* Added px-4 here */}
          {/* Plant Specification Card */}
          <div className="bg-transparent bg-opacity-50 border border-[#45543D] shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-center flex items-center justify-center">
              <LeafOutline className="mr-2" color="black" height="20px" width="20px" />
              Spesifikasi Tanaman
            </h3>
            <p>Tanaman tomat memerlukan sinar matahari penuh sekitar 6-8 jam sehari untuk pertumbuhan optimal, dengan suhu ideal 21-29°C di siang hari. Penyiraman harus dilakukan secara teratur.</p>
          </div>
          {/* Health Assessment Card */}
          <div className="bg-transparent bg-opacity-50 border border-[#45543D] shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-center flex items-center justify-center">
              <ScanOutline className="mr-2" color="black" height="20px" width="20px" />
              Penilaian Kesehatan/Penyakit
            </h3>
            <p>Daun menguning dapat menunjukkan kekurangan nutrisi atau penyakit seperti Verticillium wilt. Pemangkasan dan penggunaan fungisida alami bisa membantu.</p>
          </div>
        </div>
      </div>

      {/* Footer stays at the bottom */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default IdentifikasiAI;
