import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import { ArrowBackOutline } from 'react-ionicons';
import tomat from '../assets/tomat.jpg';
import selada from '../assets/selada.jpg';
import Navbar from '../components/Navbar-Login';
import Footer from '../components/FooterLogin';

const HistoryDeteksi = () => {
  return (
    <div className="flex flex-col min-h-screen w-full m-0 p-0">
      {' '}
      {/* Full height layout */}
      <Navbar />
      <main className="flex-grow w-full mx-auto max-w-4xl px-4">
        {' '}
        {/* Main content container */}
        <div className="flex justify-between items-center my-4">
          <Link to="/deteksi-penyakit" className="flex items-center text-black font-semibold text-sm ml-4">
            <ArrowBackOutline className="mr-5" color="black" height="50px" width="30px" />
            Kembali
          </Link>
        </div>
        {/* Identification Section */}
        <div className="space-y-6">
          {' '}
          {/* Add space between items */}
          {/* Identification 1 */}
          <div className="flex items-center justify-center space-x-4">
            <div className="flex flex-col text-right mr-2">
              <h2 className="text-lg font-bold">Tomat</h2>
              <p className="text-sm text-gray-600">1 hari yang lalu</p>
            </div>
            <div className="border-l-2 border-[#565E6D] h-24 mx-4"></div>
            <div className="flex flex-col items-center">
              <Link to="/identifikasi-ai" className="relative group">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-200 rounded-lg"></div>
                <img src={tomat} alt="Tomat" className="w-28 h-28 object-cover transition-transform duration-200 transform group-hover:scale-105 group-hover:shadow-lg rounded-lg" />
              </Link>
            </div>
          </div>
          {/* Identification 2 */}
          <div className="flex items-center justify-center space-x-4">
            <div className="flex flex-col text-right mr-2">
              <h2 className="text-lg font-bold">Bunga</h2>
              <p className="text-sm text-gray-600">3 hari yang lalu</p>
            </div>
            <div className="border-l-2 border-[#565E6D] h-24 mx-4"></div>
            <div className="flex flex-col items-center">
              <Link to="/identifikasi-ai" className="relative group">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-200 rounded-lg"></div>
                <img src={selada} alt="Selada" className="w-28 h-28 object-cover transition-transform duration-200 transform group-hover:scale-105 group-hover:shadow-lg rounded-lg" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      {/* Footer Section */}
      <Footer /> {/* Ensures footer is at the bottom */}
    </div>
  );
};

export default HistoryDeteksi;
