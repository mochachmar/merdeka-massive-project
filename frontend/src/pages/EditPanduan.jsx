import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarAdmin from '../components/NavAdmin';
import FooterAdmin from '../components/FooterAdmin';
import Breadcrumbs from '../components/BreadCrumbs';

function EditPanduan() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [tipsAndTricks, setTipsAndTricks] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch guide data
  useEffect(() => {
    let isMounted = true;
  
    const fetchGuide = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/guides/${id}`);
        const guide = response.data;
  
        setTitle(guide.title);
        setShortDescription(guide.short_description);
        setLongDescription(guide.long_description);
        setTipsAndTricks(guide.tips_and_tricks);
        setImageName(guide.thumbnail_image || '');
        setPreview(guide.thumbnail_image ? `http://localhost:3000/images/${guide.thumbnail_image}` : '');
  
        // Log state after updating
        console.log('Fetched Guide:', guide);
        console.log('Updated States:', {
          title,
          shortDescription,
          longDescription,
          tipsAndTricks,
        });
      } catch (err) {
        console.error('Error fetching guide:', err);
        setError('Gagal memuat data panduan. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };
  
    if (id) fetchGuide();
  
    return () => {
      isMounted = false;
    };
  }, [id]);
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
      setPreview(URL.createObjectURL(file)); // Set the preview to the selected image
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
    setLoading(true); // Show loading indicator

    // Form validation: ensure all fields are filled
    if (!title || !longDescription || !tipsAndTricks) {
      setError('Semua kolom harus diisi');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', shortDescription);
    formData.append('long_description', longDescription);
    formData.append('tips_and_tricks', tipsAndTricks);
    formData.append('status', status);

    if (image) {
      formData.append('thumbnail_image', image);
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/guides/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (response.status === 200) {
        setSuccessMessage(`Panduan berhasil diubah menjadi ${status}`);
        setTimeout(() => navigate(`/admin/card-panduan?status=${status}`), 1000); // Redirect after 1.5 seconds
      } else {
        setError('Gagal memperbarui panduan. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Error updating guide:', err);
      setError('Gagal memperbarui panduan. Silakan coba lagi.');
    } finally {
      setLoading(false); // Set loading ke false setelah proses selesai
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Panduan</h2>

            {successMessage && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{successMessage}</div>}

            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

            <div className="mb-4">
              <label htmlFor="title" className="block font-semibold mb-2 text-gray-700">
                Judul Panduan
              </label>
              <input id="title" type="text" className="w-full p-2 border border-green-500 rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul Panduan" />
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="block font-semibold mb-2 text-gray-700">
                Deskripsi Singkat
              </label>
              <input id="short_description" type="text" className="w-full p-2 border border-green-500 rounded-md" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Deskripsi singkat" />
            </div>

            <div className="mb-4">
              <label htmlFor="longDescription" className="block font-semibold mb-2 text-gray-700">
                Pengertian
              </label>
              <textarea id="long_description" className="w-full p-2 border border-green-500 rounded-md" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} placeholder="pengertian" />
            </div>

            <div className="mb-4">
              <label htmlFor="tipsAndTricks" className="block font-semibold mb-2 text-gray-700">
                Tips dan Trik
              </label>
              <textarea id="tips_and_tricks" className="w-full p-2 border border-green-500 rounded-md" value={tipsAndTricks} onChange={(e) => setTipsAndTricks(e.target.value)} placeholder="Tips dan Trik" />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">Gambar</label>
              <div className="flex items-center">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                <label htmlFor="imageUpload" className="flex items-center border border-green-500 text-green-500 px-4 py-2 rounded-md cursor-pointer">
                  {imageName || 'Pilih Gambar'}
                </label>
              </div>

              {/* Menampilkan Preview Gambar yang Baru Diupload */}
              {preview ? (
                <div className="mt-4">
                  <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-md mb-2" />
                  <button onClick={handleRemoveImage} className="bg-red-500 text-white px-2 py-1 rounded">
                    Hapus Gambar
                  </button>
                </div>
              ) : imageName ? (
                // Menampilkan Gambar Lama jika Tidak Ada Gambar Baru Diupload
                <div className="mt-4">
                  <img
                    src={`http://localhost:3000/public/images/${imageName}`} // Menggunakan imageName untuk gambar lama
                    alt="Existing Image"
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                </div>
              ) : null}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => handleSubmit('Draft')} className="px-6 py-2 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300">
                Draft
              </button>
              <button onClick={() => handleSubmit('Published')} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Publish
              </button>
            </div>
          </div>
        </div>
      </NavbarAdmin>
      <FooterAdmin />
    </div>
  );
}

export default EditPanduan;
