import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterAdmin from '../components/FooterAdmin';
import Breadcrumbs from '../components/BreadCrumbs';
import NavbarAdmin from '../components/NavAdmin';

function AdminArtikel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  // Fetch articles from the backend
  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/articles');
      setArticles(response.data); // Data dari backend masuk ke state
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  // Delete an article
  const handleDelete = async () => {
    if (!selectedItem) {
      console.error('No article selected for deletion');
      return;
    }

    try {
      console.log('Deleting article with ID:', selectedItem.article_id); // Debugging
      const response = await axios.delete(`http://localhost:3000/api/articles/${selectedItem.article_id}`);
      console.log('Server response:', response.status); // Debugging

      if (response.status === 200 || response.status === 204) {
        // Remove the deleted article from the state
        setArticles((prevArticles) => prevArticles.filter((article) => article.article_id !== selectedItem.article_id));
        closeModal();
        console.log(`Article with ID ${selectedItem.article_id} deleted successfully.`);
      } else {
        console.error('Failed to delete article. Status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting article:', error.response || error.message);
    }
  };

  // Handle Edit Artikel: navigate to EditArtikel page with article ID
  const handleEditArtikel = (id) => {
    navigate(`/admin/card-artikel/edit-artikel/${id}`);
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
    <div className="flex flex-col min-h-screen w-full">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="flex-1 p-6 scrollable">
          <div className="flex justify-between items-center mb-4 flex-wrap">
            <h1 className="text-2xl font-semibold text-gray-800 w-full md:w-auto">Daftar Artikel</h1>
            <Link to="/admin/card-artikel/tambah-artikel" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 md:mt-0">
              Tambah Artikel
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
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
                      <td
                        className="px-4 py-2 text-gray-700"
                        style={{
                          maxWidth: '200px',
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                        }}
                      >
                        {item.title}
                      </td>
                      <td className="px-4 py-2">
                        <img src={`http://localhost:3000/uploads/${item.thumbnail_image || 'default-image.jpg'}`} alt={item.title} className="h-12 w-20 object-cover rounded-md" />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className={`px-3 py-1 rounded-full text-white font-semibold ${item.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}>{item.status === 'published' ? 'Publik' : 'Draft'}</span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button onClick={() => handleEditArtikel(item.article_id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
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

export default AdminArtikel;
