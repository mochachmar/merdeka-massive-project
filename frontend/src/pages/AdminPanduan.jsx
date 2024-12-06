import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterAdmin from '../components/FooterAdmin';
import Breadcrumbs from '../components/BreadCrumbs';
import NavbarAdmin from '../components/NavAdmin';

function AdminPanduan() {
  const navigate = useNavigate();
  const [guides, setGuides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false); // Tambahkan state untuk loading

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/guides');
        console.log(response.data); // Periksa struktur data yang diterima
        setGuides(response.data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      }
    };
    fetchGuides();
  }, []);

  const handleEditPanduan = (id) => {
    navigate(`/admin/card-panduan/edit-panduan/${id}`);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  // fetch guides on component mount

  const handleDelete = async () => {
    if (!selectedItem || !selectedItem.guide_id) {
      alert('Selected guide is invalid or not selected.');
      return;
    }

    try {
      setLoading(true); // Aktifkan loading
      console.log('Deleting guide with ID:', selectedItem.guide_id);

      // Proses penghapusan panduan
      const response = await axios.delete(`http://localhost:3000/api/guides/${selectedItem.guide_id}`);

      if (response.status === 200) {
        // Perbarui daftar panduan setelah penghapusan
        setGuides((prevGuides) => prevGuides.filter((guide) => guide.guide_id !== selectedItem.guide_id));

        // Arahkan kembali ke halaman admin panduan setelah penghapusan
        navigate('/admin/card-panduan'); // Ganti dengan path yang sesuai untuk tampilan admin panduan
      } else {
        throw new Error('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      console.error('Error deleting guide:', error.response?.data || error.message);
      alert('Gagal menghapus panduan. ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false); // Matikan loading setelah penghapusan
      closeModal(); // Menutup modal konfirmasi
    }
  };

  const handleSync = () => {
    window.location.reload(); // Muat ulang halaman
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Daftar Panduan</h1>
            <div className="flex space-x-4">
              {/* Sync Button */}
              <button onClick={handleSync} className="flex items-center bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600">
                <i className="fas fa-sync-alt mr-2"></i> {/* Font Awesome refresh icon */}Sync
              </button>

              {/* Add Guide Button */}
              <Link to="/admin/card-panduan/tambah-panduan" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Tambah Panduan
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-green-200">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-800 font-semibold">#</th>
                  <th className="px-4 py-2 text-left text-gray-800 font-semibold">Judul Panduan</th>
                  <th className="px-4 py-2 text-left text-gray-800 font-semibold">Gambar Utama</th>
                  <th className="px-4 py-2 text-center text-gray-800 font-semibold">Status</th>
                  <th className="px-4 py-2 text-center text-gray-800 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {guides.map((item, index) => (
                  <tr key={item.guide_id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2 text-center font-medium text-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-700">{item.title}</td>
                    <td className="px-4 py-2">
                      <img src={`http://localhost:3000/images/${item.thumbnail_image}`} alt={item.title} className="h-12 w-20 object-cover rounded-md" />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={`px-3 py-1 rounded-full text-white font-semibold ${item.status === 'Publik' ? 'bg-green-500' : 'bg-yellow-500'}`}>{item.status}</span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          console.log('guide_id yang dipilih:', item.guide_id); // Log untuk memastikan ID
                          handleEditPanduan(item.guide_id);
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button onClick={() => openModal(item)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal Konfirmasi Penghapusan */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center relative">
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ✖️
              </button>
              <h2 className="text-lg font-semibold mb-4">Apakah Anda yakin ingin menghapus artikel ini?</h2>
              <div className="flex justify-center items-center space-x-4 mt-4">
                <button onClick={handleDelete} className={`bg-red-500 text-white px-4 py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`} disabled={loading}>
                  {loading ? 'Menghapus...' : 'Hapus'}
                </button>
                <button onClick={closeModal} className="border border-gray-500 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </NavbarAdmin>
      <FooterAdmin />
    </div>
  );
}

export default AdminPanduan;
