import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Link } from 'react-router-dom';

const PersonalSetting = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({ email: '', name: '' });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/auth/user-data'); // Update with your actual endpoint
        if (response.data.success) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleNameChange = (event) => {
    setUserData({ ...userData, name: event.target.value });
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    try {
      await axios.put('/api/auth/update-name', { name: userData.name }); // Update with your actual endpoint
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Perubahan berhasil disimpan!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error('Failed to save changes:', error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Gagal menyimpan perubahan.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const handleDeleteAccount = async () => {
    // Menampilkan dialog input password menggunakan SweetAlert2
    const { value: password } = await Swal.fire({
      title: 'Hapus Akun',
      text: 'Masukkan password Anda untuk menghapus akun:',
      input: 'password',
      inputPlaceholder: 'Password',
      inputAttributes: {
        autocapitalize: 'off',
        autocomplete: 'new-password',
      },
      showCancelButton: true,
      confirmButtonText: 'Hapus Akun',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      inputValidator: (value) => {
        if (!value) {
          return 'Password tidak boleh kosong!';
        }
      },
    });

    if (password) {
      try {
        await axios.post('/api/auth/delete-account', { password }); // Kirim password ke backend
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Akun berhasil dihapus! Anda akan dialihkan!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        setTimeout(() => {
          window.location.href = '/'; // Redirect ke halaman utama
        }, 2000);
      } catch (error) {
        console.error('Gagal menghapus akun:', error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: error.response?.data?.message || 'Terjadi kesalahan saat menghapus akun. Pastikan password yang dimasukkan benar!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Hamburger Menu */}
      <button onClick={toggleSidebar} className={`lg:hidden p-4 z-30 fixed top-0 ${isSidebarOpen ? 'right-0' : 'left-0'} transition-all duration-300`} aria-label="Toggle Sidebar">
        {isSidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative lg:w-1/4 w-3/4 bg-[#E7F0DC] p-4 sm:p-6 h-full transition-transform duration-300 ease-in-out z-20`}>
        <Link to="/beranda-login" className="flex items-center space-x-2">
          <img src="./src/assets/settings-icon.svg" alt="Pengaturan Icon" className="w-5 h-5" />
          <h2 className="text-lg font-bold">Pengaturan</h2>
        </Link>
        <ul className="mt-4 space-y-4">
          <li>
            <Link to="/personal-setting" className="flex items-center space-x-2 p-2 rounded-md bg-white hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer border border-[#6D7E5E]">
              <img src="./src/assets/user-icon.svg" alt="Pribadi Icon" className="w-5 h-5" />
              <span>Pribadi</span>
            </Link>
          </li>

          <li>
            <Link to="/password-setting" className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer">
              <img src="./src/assets/lock-icon.svg" alt="Kata Sandi Icon" className="w-5 h-5" />
              <span>Kata Sandi</span>
            </Link>
          </li>
          <li>
            <Link to="/appearance-setting" className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer">
              <img src="./src/assets/paint-icon.svg" alt="Tampilan Icon" className="w-5 h-5" />
              <span>Tampilan</span>
            </Link>
          </li>
          <li>
            <Link to="/other-setting" className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#C5D9A4] transition duration-300 ease-in-out cursor-pointer">
              <img src="./src/assets/menu-icon.svg" alt="Lainnya Icon" className="w-5 h-5" />
              <span>Lainnya</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto h-full lg:ml-0">
        <h2 className="text-xl font-semibold mb-6">Pribadi</h2>
        <form onSubmit={handleSaveChanges} className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input type="email" className="w-full p-2 border rounded-md mt-1" value={userData.email} readOnly />
          </div>
          <div>
            <label className="block font-medium">Nama</label>
            <input type="text" className="w-full p-2 border rounded-md mt-1" value={userData.name} onChange={handleNameChange} />
          </div>
          <div className="mt-6">
            <h3 className="font-medium text-red-600">Hapus Akun</h3>
            <p className="text-gray-500 mb-2">Hapus akun Anda dan semua datanya</p>
            <button type="button" onClick={handleDeleteAccount} className="bg-red-100 text-red-600 border border-red-600 rounded-md px-4 py-2">
              Hapus Akun
            </button>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" className="border rounded-md px-4 py-2">
              Batal
            </button>
            <button type="submit" className="bg-[#6D7E5E] text-white rounded-md px-4 py-2 border border-[#C4C8AD] hover:bg-[#91A079]">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalSetting;
