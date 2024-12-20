import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarAdmin from '../components/NavAdmin';
import FooterAdmin from '../components/FooterAdmin';
import Breadcrumbs from '../components/BreadCrumbs';

function IsiArtikel() {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  // Fetch articles from backend
  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/articles');
      setArticles(response.data); // Store data in state
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  // Delete an article
  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      console.log(`Deleting article with ID: ${selectedItem.article_id}`);
      const response = await axios.delete(`http://localhost:3000/api/articles/${selectedItem.article_id}`);

      if (response.status === 200 || response.status === 204) {
        // Remove the deleted article from state
        setArticles((prevArticles) => prevArticles.filter((article) => article.article_id !== selectedItem.article_id));
        closeModal();
        console.log(`Article ${selectedItem.article_id} deleted successfully.`);
      } else {
        console.error('Failed to delete the article:', response.status);
      }
    } catch (error) {
      console.error('Error deleting article:', error.message);
    }
  };

  // Handle edit article
  const handleEditIsiArtikel = (id) => {
    navigate(`/admin/isi-artikel/edit-isi-artikel/${id}`);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="full-screen full-width bg-gray-100">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="flex-1 p-6 scrollable">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Daftar Artikel</h1>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-green-200">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-800 font-semibold">No</th>
                  <th className="px-4 py-2 text-left text-gray-800 font-semibold">Judul Artikel</th>
                  <th className="px-4 py-2 text-left text-gray-800 font-semibold">Gambar Utama</th>
                  <th className="px-4 py-2 text-center text-gray-800 font-semibold">Status</th>
                  <th className="px-4 py-2 text-center text-gray-800 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((item, index) => (
                  <tr key={item.article_id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2 text-center font-medium text-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-700" style={{ maxWidth: '200px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                      {item.title}
                    </td>
                    <td className="px-4 py-2">
                      <img src={`http://localhost:3000/uploads/${item.thumbnail_image}`} alt={item.title} className="h-12 w-20 object-cover rounded-md" />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={`px-3 py-1 rounded-full text-white font-semibold ${item.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}>{item.status}</span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button onClick={() => handleEditIsiArtikel(item.article_id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
                        ✏️
                      </button>
                      <button onClick={() => openModal(item)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Delete Confirmation Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                  ✖️
                </button>
                <h2 className="text-lg font-semibold mb-4">
                  Apakah Anda yakin ingin menghapus artikel <strong>{selectedItem?.title}</strong>?
                </h2>
                <div className="flex justify-center items-center space-x-4 mt-4">
                  <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                    Hapus
                  </button>
                  <button onClick={closeModal} className="border border-gray-500 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </NavbarAdmin>
      <FooterAdmin />
    </div>
  );
}

export default IsiArtikel;
