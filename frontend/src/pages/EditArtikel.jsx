import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarAdmin from '../components/NavAdmin';
import FooterAdmin from '../components/FooterAdmin';
import Breadcrumbs from '../components/BreadCrumbs';

function EditArtikel() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State untuk menyimpan data form
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  // Fungsi untuk mengambil data artikel berdasarkan ID
  const fetchArticle = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/articles/${id}`);
      const { title, date, description, thumbnail_image } = response.data;

      setTitle(title);
      setDate(date);
      setDescription(description);
      setImage(`http://localhost:5000/uploads/${thumbnail_image}`);
    } catch (error) {
      console.error('Error fetching article data:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchArticle(); // Ambil data artikel ketika ID tersedia
    }
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Membuat URL untuk pratinjau gambar
      setImageName(file.name); // Menyimpan nama file untuk ditampilkan
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageName('');
  };

  const handleSubmit = (status) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('publish_date', publishDate);
    formData.append('short_description', description);
    formData.append('status', status);

    // Menambahkan gambar jika ada
    if (image instanceof File) {
      formData.append('image', image); // Mengirimkan file gambar
    }

    // Mengirimkan data artikel melalui PUT request
    axios
      .put(`http://localhost:5000/api/articles/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Artikel berhasil diperbarui:', response.data);
        navigate('/admin/card-artikel'); // Navigasi setelah berhasil update
      })
      .catch((error) => {
        console.error('Error updating article:', error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Artikel</h2>

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
                id="publishDate"
                type="date"
                className="w-full p-2 border border-green-500 rounded-md"
                value={publishDate}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Input Deskripsi */}
            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold mb-2 text-gray-700">
                Deskripsi
              </label>
              <textarea
                id="description"
                className="w-full p-2 border border-green-500 rounded-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi Artikel"
              />
            </div>

            {/* Input Gambar */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">Gambar Artikel</label>
              {image ? (
                <div>
                  <img
                    src={image}
                    alt="Thumbnail"
                    className="h-40 w-40 object-cover mb-4 rounded-md"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="text-red-500 hover:text-red-700"
                  >
                    Hapus Gambar
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-4"
                  />
                </div>
              )}
            </div>

            {/* Tombol Submit */}
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => handleSubmit('published')}
              >
                Terbitkan
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                onClick={() => handleSubmit('draft')}
              >
                Simpan Sebagai Draft
              </button>
            </div>
          </div>
        </div>
      </NavbarAdmin>
      <FooterAdmin />
    </div>
  );
}

export default EditArtikel;
