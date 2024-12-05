import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../components/NavAdmin';
import FooterAdmin from '../components/FooterAdmin';
import Breadcrumbs from '../components/BreadCrumbs';
import axios from 'axios';

function TambahPanduan() {
  const navigate = useNavigate();

  // State untuk menyimpan data form
  const [judul, setJudul] = useState('');
  const [deskripsiSingkat, setDeskripsiSingkat] = useState('');
  const [pengertian, setPengertian] = useState('');
  const [tipsAndTricks, setTipsAndTricks] = useState('');
  const [gambarThumbnail, setGambarThumbnail] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [status, setStatus] = useState('draft'); // Default status adalah "draft"
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fungsi untuk menangani perubahan input gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setErrorMessage('Gambar terlalu besar! Maksimal ukuran gambar 5MB.');
        return;
      }
      setGambarThumbnail(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Fungsi untuk menghapus gambar
  const handleRemoveImage = () => {
    setGambarThumbnail(null);
    setImagePreview('');
  };

  // Fungsi submit untuk draft atau publikasi
  const handleSubmit = async (submitStatus) => {
    if (!judul || !deskripsiSingkat || !pengertian || !tipsAndTricks || !gambarThumbnail) {
      setErrorMessage('Semua field wajib diisi!');
      return;
    }

    setErrorMessage(''); // Reset pesan error
    setStatus(submitStatus); // Set status sesuai tombol yang diklik

    navigate('/admin/card-panduan');

    const formData = new FormData();
    formData.append('title', judul);
    formData.append('short_description', deskripsiSingkat);
    formData.append('long_description', pengertian);
    formData.append('tips_and_tricks', tipsAndTricks);
    formData.append('status', submitStatus);
    formData.append('thumbnail_image', gambarThumbnail);

    try {
      const response = await axios.post('http://localhost:3000/api/guides', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Respon dari server:', response.data);
    } catch (error) {
      console.error('Gagal mengirim data panduan:', error);
      setErrorMessage(error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tambah Panduan Baru</h2>

            {errorMessage && <p className="text-red-500 font-semibold mb-4">{errorMessage}</p>}

            {/* Input Judul Panduan */}
            <div className="mb-4">
              <label htmlFor="judul" className="block font-semibold mb-2 text-gray-700">
                Judul Panduan
              </label>
              <input id="judul" type="text" className="w-full p-2 border border-green-500 rounded-md" value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Judul Panduan" />
            </div>

            {/* Input Deskripsi Singkat */}
            <div className="mb-4">
              <label htmlFor="deskripsi_singkat" className="block font-semibold mb-2 text-gray-700">
                Deskripsi Singkat
              </label>
              <textarea id="deskripsi_singkat" className="w-full p-2 border border-green-500 rounded-md" value={deskripsiSingkat} onChange={(e) => setDeskripsiSingkat(e.target.value)} placeholder="Deskripsi Singkat Panduan" />
            </div>

            {/* Input pengertian */}
            <div className="mb-4">
              <label htmlFor="pengertian" className="block font-semibold mb-2 text-gray-700">
                Pengertian
              </label>
              <textarea id="pengertian" className="w-full p-2 border border-green-500 rounded-md" value={pengertian} onChange={(e) => setPengertian(e.target.value)} placeholder=" Pengertian Panduan" />
            </div>

          {/* Input tips and tricks */}
          <div className="mb-4">
              <label htmlFor="tips_and_tricks" className="block font-semibold mb-2 text-gray-700">
                Tips dan Tricks
              </label>
              <textarea id="tips_and_tricks" className="w-full p-2 border border-green-500 rounded-md" value={tipsAndTricks} onChange={(e) => setTipsAndTricks(e.target.value)} placeholder=" tips dan tricks Panduan" />
            </div>

            {/* Input Gambar */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">Thumbnail Gambar</label>
              <div className="flex items-center">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                <label htmlFor="imageUpload" className="flex items-center border border-green-500 text-green-500 px-4 py-2 rounded-md cursor-pointer">
                  {gambarThumbnail ? gambarThumbnail.name : 'Pilih File'}
                </label>
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-gray-700 mb-2">Your Image</p>
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-md mb-2" />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button onClick={handleRemoveImage} className="bg-red-500 text-white px-2 py-1 rounded">
                        Hapus Gambar
                      </button>
                      <label htmlFor="imageUpload" className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">
                        Ganti Gambar
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tombol Submit */}
            <div className="flex justify-end space-x-4">
              <button onClick={() => handleSubmit('Draft')} className={`px-4 py-2 rounded-md ${status === 'Draft' ? 'bg-yellow-600' : 'bg-yellow-500'} text-white`}>
                Draft
              </button>
              <button onClick={() => handleSubmit('Published')} className={`px-4 py-2 rounded-md ${status === 'Published' ? 'bg-green-600' : 'bg-green-500'} text-white`}>
                Publikasikan
              </button>
            </div>
          </div>
        </div>
      </NavbarAdmin>
      <FooterAdmin />
    </div>
  );
}

export default TambahPanduan;
