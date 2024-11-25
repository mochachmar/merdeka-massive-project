import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarAdmin from '../components/NavAdmin';
import FooterAdmin from '../components/FooterAdmin';
import Breadcrumbs from '../components/BreadCrumbs';

function EditPanduan() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for storing form data
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch guide data based on the id
  useEffect(() => {
    if (id) {
      fetchGuide();
    }
  }, [id]);

  const fetchGuide = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/guides/${id}`);
      const guide = response.data;
      setTitle(guide.title);
      setShortDescription(guide.short_description);
      setStatus(guide.status); // Periksa status yang diterima
      setImageName(guide.thumbnail_image || '');
    } catch (error) {
      console.error('Error fetching guide:', error);
      setError('Failed to load guide data');
    }
    setLoading(false);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImage(null);
    setImageName('');
  };

  // Handle form submission for updating the guide status
  const handleSubmit = async (status) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', shortDescription);
    formData.append('status', status); // Status is passed based on button clicked

    if (image) {
      formData.append('thumbnail_image', image);
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/guides/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setSuccessMessage(`Panduan berhasil diubah menjadi ${status}`);
        setTimeout(() => navigate('/admin/card-panduan'), 1000);
      }
    } catch (error) {
      console.error('Error updating guide:', error);
      setError('Gagal memperbarui panduan');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Panduan</h2>

            {/* Success message */}
            {successMessage && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{successMessage}</div>}

            {/* Title input */}
            <div className="mb-4">
              <label htmlFor="title" className="block font-semibold mb-2 text-gray-700">
                Judul Panduan
              </label>
              <input id="title" type="text" className="w-full p-2 border border-green-500 rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul Panduan" />
            </div>

            {/* Short description input */}
            <div className="mb-4">
              <label htmlFor="shortDescription" className="block font-semibold mb-2 text-gray-700">
                Deskripsi Singkat
              </label>
              <textarea id="shortDescription" className="w-full p-2 border border-green-500 rounded-md" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Deskripsi Singkat" />
            </div>

            {/* Image upload */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">Gambar</label>
              <div className="flex items-center">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                <label htmlFor="imageUpload" className="flex items-center border border-green-500 text-green-500 px-4 py-2 rounded-md cursor-pointer">
                  {imageName || 'Choose File'}
                </label>
              </div>
              {image && (
                <div className="mt-4">
                  <img src={image instanceof File ? URL.createObjectURL(image) : `http://localhost:3000/public/images/${imageName}`} alt="Preview" className="w-full h-48 object-cover rounded-md mb-2" />
                  <button onClick={handleRemoveImage} className="bg-red-500 text-white px-2 py-1 rounded">
                    Hapus Gambar
                  </button>
                </div>
              )}
            </div>

            {/* Status buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => handleSubmit('Draft')} className="px-6 py-2 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300">
                Draft
              </button>
              <button onClick={() => handleSubmit('Published')} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Published
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
