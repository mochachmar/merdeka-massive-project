import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowBackOutline, DownloadOutline } from 'react-ionicons';
import '../index.css';
import Navbar from '../components/Navbar-Login';
import Footer from '../components/FooterLogin';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

const Tips = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [guides, setGuides] = useState(null); // State untuk data panduan
  const [error, setError] = useState(null); // State untuk menangani error

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchGuides = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/guides/${id}`); // URL API
        console.log(response.data); // Memeriksa data yang diterima
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

  const downloadPDF = () => {
    const content = document.getElementById('content'); // Ambil konten untuk diunduh sebagai PDF

    // Simpan status awal border
    const originalBorder = content.style.border;

    // Hilangkan border sementara untuk PDF
    content.style.border = 'none';

    // Capture content including images and styling
    html2canvas(content, {
      scale: 2, // Meningkatkan kualitas gambar
      useCORS: true, // Menggunakan CORS untuk memuat gambar dari domain lain
      allowTaint: false, // Tidak mengizinkan penggunaan gambar tanpa akses
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Menyimpan ukuran konten pada halaman untuk menyesuaikan PDF dengan ukuran tampilan asli
        const contentWidth = content.offsetWidth;
        const contentHeight = content.offsetHeight;

        // Menambahkan margin (misalnya 10mm) ke ukuran PDF
        const margin = 10; // Margin 10mm di sekitar konten
        const pdfWidth = 210 - 2 * margin; // Lebar A4 dikurangi margin kiri dan kanan
        const pdfHeight = (contentHeight * pdfWidth) / contentWidth + 2 * margin; // Menjaga proporsi gambar, ditambah margin atas dan bawah

        // Menambahkan gambar ke PDF dengan ukuran yang sesuai dan margin
        pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight - 2 * margin); // Menyesuaikan lebar dan tinggi gambar agar sesuai dengan ukuran PDF, dengan margin

        // Menyimpan file PDF dengan nama dinamis
        pdf.save(`${guides.title || 'tips'}.pdf`);

        // Kembalikan border ke semula
        content.style.border = originalBorder;
      })
      .catch((error) => {
        console.error('Error capturing content:', error);

        // Kembalikan border ke semula jika ada error
        content.style.border = originalBorder;
      });
  };

  if (error) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <p className="text-red-500 text-lg">{error}</p>
          <Link to="/panduan-login" className="mt-4 text-blue-500 underline">
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

  // Membersihkan data tips untuk menghindari teks yang tidak diinginkan
  const cleanedTips = guides.tips_and_tricks
    ? guides.tips_and_tricks
        .split('\n')
        .filter((tip) => !tip.includes('Merawat tanaman selada'))
        .map((tip, index) => <li key={index}>{tip}</li>)
    : 'Tips tidak tersedia.';

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full px-4 pb-8">
        <div className="flex justify-between items-center w-full max-w-4xl mt-4 mb-6">
          <Link to="/panduan-login" className="flex items-center text-black font-semibold text-sm">
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
            onClick={downloadPDF}
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
            <ul className="list-disc list-inside space-y-2 text-justify w-full">{cleanedTips}</ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tips;
