import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import FooterAdmin from '../components/FooterAdmin';
import NavbarAdmin from '../components/NavAdmin';
import Breadcrumbs from '../components/BreadCrumbs';
import IconArtikel from '../assets/artikel.svg';
import IconPanduan from '../assets/panduan.svg';

export default function Admin() {
  const [jumlahPanduan, setJumlahPanduan] = useState(0); // State to store the number of guides
  const [jumlahArtikelApi, setJumlahArtikelApi] = useState(0); // State to store the number of articles from API

  // Fetch guides count when the component mounts
  useEffect(() => {
    const fetchPanduanCount = async () => {
      try {
        const response = await fetch('/api/guides'); // Replace with your actual API endpoint
        const data = await response.json();
        setJumlahPanduan(data.length); // Assuming the response returns an array of guides
      } catch (error) {
        console.error('Error fetching guides count:', error);
      }
    };

    fetchPanduanCount();
  }, []);

  // Fetch articles count when the component mounts
  useEffect(() => {
    const fetchArtikelCount = async () => {
      try {
        const response = await fetch('/api/articles'); // Replace with your actual API endpoint
        const data = await response.json();
        setJumlahArtikelApi(data.length); // Assuming the response returns an array of articles
      } catch (error) {
        console.error('Error fetching articles count:', error);
      }
    };

    fetchArtikelCount();
  }, []);

  const jumlahArtikel = 7;

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Admin</h1>
          <div className="flex flex-wrap gap-8 justify-center">
            {/* Artikel Card */}
            <div className="relative border border-green-500 rounded-lg p-6 w-full sm:w-1/2 md:w-1/3 lg:w-60 text-center">
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">{jumlahArtikelApi || jumlahArtikel}</div>
              <img src={IconArtikel} alt="Artikel Icon" className="mx-auto mb-4 w-12 h-12" />
              <h2 className="font-bold text-lg text-gray-800 mb-2">Artikel</h2>
              <Link to="/admin/card-artikel">
                <button className="bg-green-200 text-green-700 px-4 py-2 rounded-lg mt-2 flex items-center justify-center text-center w-full hover:shadow-lg transition-shadow">
                  Selengkapnya
                  <span className="ml-2">→</span>
                </button>
              </Link>
            </div>

            {/* Panduan Card */}
            <div className="relative border border-green-500 rounded-lg p-6 w-full sm:w-1/2 md:w-1/3 lg:w-60 text-center">
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">{jumlahPanduan}</div>
              <img src={IconPanduan} alt="Panduan Icon" className="mx-auto mb-4 w-12 h-12" />
              <h2 className="font-bold text-lg text-gray-800 mb-2">Panduan</h2>
              <Link to="/admin/card-panduan">
                <button className="bg-green-200 text-green-700 px-4 py-2 rounded-lg mt-2 flex items-center justify-center text-center w-full hover:shadow-lg transition-shadow">
                  Selengkapnya
                  <span className="ml-2">→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Outlet />
      </NavbarAdmin>
      <FooterAdmin />
    </div>
  );
}
