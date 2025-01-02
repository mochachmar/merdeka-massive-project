// HistoryDeteksi.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { ArrowBackOutline } from 'react-ionicons';
import Navbar from '../components/Navbar-Login';
import Footer from '../components/FooterLogin';
import { getPlantHistory } from '../services/plantService.js';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

const HistoryDeteksi = () => {
  const [plantHistory, setPlantHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getPlantHistory();
        setPlantHistory(data);
      } catch (error) {
        alert('Gagal mengambil histori tanaman. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full m-0 p-0">
      <Navbar />
      <main className="flex-grow w-full mx-auto max-w-4xl px-4">
        <div className="flex justify-between items-center my-4">
          <Link to="/deteksi-penyakit" className="flex items-center text-black font-semibold text-sm ml-4">
            <ArrowBackOutline className="mr-5" color="black" height="50px" width="30px" />
            Kembali
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : plantHistory.length === 0 ? (
          <p>Tidak ada histori deteksi tanaman.</p>
        ) : (
          <div className="space-y-6">
            {plantHistory.map((plant) => (
              <div key={plant.plant_id} className="flex items-center justify-center space-x-4">
                <div className="flex flex-col text-right mr-2">
                  <h2 className="text-lg font-bold">{plant.plant_name}</h2>
                  <p className="text-sm text-gray-600">{formatDistanceToNow(new Date(plant.createdAt), { addSuffix: true, locale: id })}</p>
                </div>
                <div className="border-l-2 border-[#565E6D] h-24 mx-4"></div>
                <div className="flex flex-col items-center">
                  <Link
                    to="/hasil-ai"
                    state={{ plantData: plant, isHistory: true }} // Kirim data tanaman sebagai state
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-200 rounded-lg"></div>
                    <img
                      src={`http://localhost:3000/${plant.photo_url}`} // Pastikan URL ini benar
                      alt={plant.plant_name}
                      className="w-28 h-28 object-cover transition-transform duration-200 transform group-hover:scale-105 group-hover:shadow-lg rounded-lg"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HistoryDeteksi;
