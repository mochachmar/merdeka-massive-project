import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowBackOutline, DownloadOutline } from 'react-ionicons';
import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Tips = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate(); // Untuk navigasi
  const [guides, setGuides] = useState(null); // State untuk data panduan
  const [error, setError] = useState(null); // State untuk menangani error

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchGuides = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/guides/${id}`); // URL API
        console.log('Response Data:', response.data); // Debug respons
        setGuides(response.data); // Simpan data panduan ke state
        setError(null); // Reset error jika berhasil
      } catch (err) {
        console.error('Error fetching guide data:', err);
        setError('Panduan tidak ditemukan atau terjadi kesalahan.');
      }
    };

    if (id) {
      fetchGuides();
    }
  }, [id]);

  const handleDownloadClick = () => {
    // Arahkan pengguna ke halaman sign-up untuk mendownload
    navigate('/sign-up');
  };

  if (error) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <p className="text-red-500 text-lg">{error}</p>
          <Link to="/panduan" className="mt-4 text-blue-500 underline">
            Kembali ke Panduan
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!guides) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow flex items-center justify-center text-center px-4">
          <p className="text-gray-500 text-lg">Memuat data panduan...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full px-4 pb-8">
        <div className="flex justify-between items-center w-full max-w-4xl mt-4 mb-6">
          <Link to="/panduan" className="flex items-center text-black font-semibold text-sm">
            <ArrowBackOutline className="mr-2" color="black" height="20px" width="20px" />
            Kembali
          </Link>
          <button
            className="px-4 py-2 font-semibold text-white rounded transition duration-300 flex items-center"
            style={{
              backgroundColor: '#6D7E5E',
              borderRadius: '10px',
              border: '2px #91A079 solid',
              color: 'white',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#91A079')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6D7E5E')}
            onClick={handleDownloadClick}
          >
            <DownloadOutline className="mr-2" color="white" height="20px" width="20px" />
            Download
          </button>
        </div>
        {/* Guide Content Card */}
        <div className="bg-white shadow-md border border-gray-400 rounded-lg p-6 w-full max-w-4xl" id="content">
          <div className="flex flex-col items-center">
            <img src={`http://localhost:3000/images/${guides.thumbnail_image}`} alt={guides.title || 'Thumbnail Image'} className="mb-4 rounded w-full max-h-80 h-auto object-cover" />
            <h2 className="text-2xl font-bold mb-4 text-center mt-2 w-full">{guides.title || 'Judul tidak tersedia'}</h2>
            <p className="text-justify mb-4 mt-2 w-full">{guides.long_description || 'Deskripsi tidak tersedia.'}</p>
            <h2 className="text-2xl font-bold mb-4 text-left mt-6 w-full">Tips & Trik</h2>
            <ul className="list-disc list-inside space-y-2 text-justify w-full">
              {guides.tips_and_tricks ? (
                Array.isArray(guides.tips_and_tricks) ? (
                  guides.tips_and_tricks.map((tip, index) => <li key={index}>{tip}</li>)
                ) : (
                  guides.tips_and_tricks
                    .split('\n') // Pecah jika `tips_and_tricks` adalah string
                    .filter((tip) => tip.trim() !== '') // Hapus baris kosong
                    .map((tip, index) => <li key={index}>{tip}</li>)
                )
              ) : (
                <p className="text-gray-500">Tips dan trik tidak tersedia.</p>
              )}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tips;
