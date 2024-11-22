import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarAdmin from '../components/NavAdmin';
import FooterAdmin from '../components/FooterAdmin';
import Breadcrumbs from '../components/BreadCrumbs';

function TambahArtikel() {
  const navigate = useNavigate();

  // State untuk menyimpan data form
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [status, setStatus] = useState('');

  // Fungsi untuk menangani perubahan input gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Menyimpan file untuk dikirim
      setImagePreview(URL.createObjectURL(file)); // Membuat pratinjau gambar
    }
  };

  // Fungsi untuk menghapus gambar yang telah diunggah
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('');
  };

  // Fungsi untuk mengirim artikel ke backend
  const handleSubmit = async (submitStatus) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', description);
    formData.append('long_description', content);
    formData.append('publish_date', date);
    formData.append('status', submitStatus);
    if (image) formData.append('thumbnail_image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/articles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Respon dari server:', response.data);
      navigate('/admin/card-artikel'); // Navigasi setelah berhasil submit
    } catch (error) {
      console.error('Gagal mengirim artikel:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tambah Artikel Baru</h2>

            {/* Input Judul Artikel */}
            <div className="mb-4">
              <label htmlFor="title" className="block font-semibold mb-2 text-gray-700">
                Judul Artikel
              </label>
              <input
                id="title"
                type="text"
                className="w-full p-2 border border-green-500 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Judul Artikel"
              />
            </div>

            {/* Input Tanggal Publikasi */}
            <div className="mb-4">
              <label htmlFor="date" className="block font-semibold mb-2 text-gray-700">
                Tanggal Publikasi
              </label>
              <input
                id="date"
                type="date"
                className="w-full p-2 border border-green-500 rounded-md"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Input Deskripsi Singkat */}
            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold mb-2 text-gray-700">
                Deskripsi Singkat
              </label>
              <textarea
                id="description"
                className="w-full p-2 border border-green-500 rounded-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi Singkat Artikel"
              />
            </div>

            {/* Input Isi Artikel */}
            <div className="mb-4">
              <label htmlFor="content" className="block font-semibold mb-2 text-gray-700">
                Isi Artikel
              </label>
              <textarea
                id="content"
                className="w-full p-2 border border-green-500 rounded-md"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Isi Artikel"
              />
            </div>

            {/* Input Gambar */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">Gambar</label>
              <div className="flex items-center">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                <label
                  htmlFor="imageUpload"
                  className="flex items-center border border-green-500 text-green-500 px-4 py-2 rounded-md cursor-pointer"
                >
                  {image ? image.name : 'Pilih Gambar'}
                </label>
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-gray-700 mb-2">Pratinjau Gambar:</p>
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
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => handleSubmit('draft')}
                className="px-6 py-2 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300"
              >
                Draft
              </button>
              <button
                onClick={() => handleSubmit('published')}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
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

export default TambahArtikel;