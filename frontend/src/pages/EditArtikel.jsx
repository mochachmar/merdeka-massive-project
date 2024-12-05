import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarAdmin from '../components/NavAdmin';
import FooterAdmin from '../components/FooterAdmin';
import Breadcrumbs from '../components/BreadCrumbs';

function EditArtikel() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [publisher, setPublisher] = useState('');
  const [imageName, setImageName] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/articles/${id}`);
        const article = response.data;

        setTitle(article.title);
        setDate(article.publish_date);
        setDescription(article.short_description);
        setContent(article.long_description);
        setPublisher(article.created_by || '');
        setImageName(article.thumbnail_image || '');
        setPreview(article.thumbnail_image ? `http://localhost:3000/uploads/${article.thumbnail_image}` : '');
      } catch (err) {
        console.error('Error fetching article data:', err);
        setError('Gagal memuat data artikel. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImage(null);
    setImageName('');
    setPreview('');
  };

  // Handle form submission
  const handleSubmit = async (status) => {
    setLoading(true);

    if (!title || !date || !description || !content) {
      setError('Semua kolom harus diisi');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('publish_date', date);
    formData.append('short_description', description);
    formData.append('long_description', content);
    formData.append('created_by', publisher);
    formData.append('status', status);

    if (image) {
      formData.append('thumbnail_image', image);
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/articles/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setSuccessMessage(`Artikel berhasil diubah menjadi ${status}`);
        setTimeout(() => navigate(`/admin/card-artikel?status=${status}`), 1000);
      } else {
        setError('Gagal memperbarui artikel. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Error updating article:', err);
      setError('Gagal memperbarui artikel. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Artikel</h2>

            {successMessage && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{successMessage}</div>}
            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

            <div className="mb-4">
              <label htmlFor="title" className="block font-semibold mb-2 text-gray-700">Judul Artikel</label>
              <input id="title" type="text" className="w-full p-2 border border-green-500 rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul Artikel" />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block font-semibold mb-2 text-gray-700">Tanggal Publikasi</label>
              <input id="date" type="date" className="w-full p-2 border border-green-500 rounded-md" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="mb-4">
              <label htmlFor="publisher" className="block font-semibold mb-2 text-gray-700">Penerbit</label>
              <input id="publisher" type="text" className="w-full p-2 border border-green-500 rounded-md" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Penerbit" />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold mb-2 text-gray-700">Deskripsi Singkat</label>
              <textarea id="description" className="w-full p-2 border border-green-500 rounded-md" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsi Singkat" />
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block font-semibold mb-2 text-gray-700">Isi Artikel</label>
              <textarea id="content" className="w-full p-2 border border-green-500 rounded-md" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Isi Artikel" />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">Gambar Artikel</label>
              <div className="flex items-center">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                <label htmlFor="imageUpload" className="flex items-center border border-green-500 text-green-500 px-4 py-2 rounded-md cursor-pointer">
                  {imageName || 'Pilih Gambar'}
                </label>
              </div>

              {preview && (
                <div className="mt-4">
                  <img src={preview} alt="Preview" className="w-80 h-48 object-cover rounded-md mb-2" />
                  <button onClick={handleRemoveImage} className="bg-red-500 text-white px-2 py-1 rounded">Hapus Gambar</button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => handleSubmit('Draft')} className="px-6 py-2 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300">Draft</button>
              <button onClick={() => handleSubmit('Published')} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Publish</button>
            </div>
          </div>
        </div>
      </NavbarAdmin>
      <FooterAdmin />
    </div>
  );
}

export default EditArtikel;
