import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/NavAdmin";
import FooterAdmin from "../components/FooterAdmin";
import Breadcrumbs from "../components/BreadCrumbs";
import axios from "axios";

function TambahPanduan() {
  const navigate = useNavigate();

  // State untuk menyimpan data form
  const [judul, setJudul] = useState("");
  const [deskripsiSingkat, setDeskripsiSingkat] = useState("");
  const [gambarThumbnail, setGambarThumbnail] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // State untuk status pengiriman

  // Fungsi untuk menangani perubahan input gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambarThumbnail(file); // Menyimpan file gambar
      setImageName(file.name); // Menyimpan nama file untuk ditampilkan
    }
  };

  // Fungsi untuk menghapus gambar yang telah diunggah
  const handleRemoveImage = () => {
    setGambarThumbnail(null);
    setImageName("");
  };

  // Fungsi untuk mengirim panduan sebagai draft atau kirim (publish)
  const handleSubmit = async (status) => {
    const formData = new FormData();

    // Mengirim data dengan memetakan variabel frontend ke nama yang sesuai di backend
    formData.append("title", judul); // Mengirim 'title' ke backend
    formData.append("short_description", deskripsiSingkat); // Mengirim 'short_description' ke backend
    formData.append("status", status); // Status sebagai 'Draft' atau 'Publish'

    // Menambahkan gambar thumbnail jika ada
    if (gambarThumbnail) {
      formData.append("thumbnail_image", gambarThumbnail); // Mengirim 'thumbnail_image' ke backend
    }

    try {
      // Mengirim data ke backend menggunakan axios
      const response = await axios.post("/api/guides", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Panduan baru yang dikirim:", response.data);

      // Menandai bahwa data telah dikirim
      setIsSubmitted(true); // Menandakan bahwa form telah disubmit

      // Navigasi ke halaman 'Card Panduan' jika data berhasil dikirim
      navigate("/admin/card-panduan"); // Setelah berhasil, arahkan ke halaman /admin/card-panduan
    } catch (error) {
      console.error("Error saat mengirim data panduan:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Tambah Panduan Baru
            </h2>

            {/* Input Judul Panduan */}
            <div className="mb-4">
              <label
                htmlFor="judul"
                className="block font-semibold mb-2 text-gray-700"
              >
                Judul Panduan
              </label>
              <input
                id="judul"
                type="text"
                className="w-full p-2 border border-green-500 rounded-md"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Judul Panduan"
              />
            </div>

            {/* Input Deskripsi Singkat */}
            <div className="mb-4">
              <label
                htmlFor="deskripsi_singkat"
                className="block font-semibold mb-2 text-gray-700"
              >
                Deskripsi Singkat
              </label>
              <textarea
                id="deskripsi_singkat"
                className="w-full p-2 border border-green-500 rounded-md"
                value={deskripsiSingkat}
                onChange={(e) => setDeskripsiSingkat(e.target.value)}
                placeholder="Deskripsi Singkat Panduan"
              />
            </div>

            {/* Input Gambar */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">
                Thumbnail Gambar
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="flex items-center border border-green-500 text-green-500 px-4 py-2 rounded-md cursor-pointer"
                >
                  {imageName || "Pilih File"}
                </label>
              </div>
              {gambarThumbnail && (
                <div className="mt-4">
                  <p className="text-gray-700 mb-2">Gambar Anda</p>
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(gambarThumbnail)}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={handleRemoveImage}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Hapus Gambar
                      </button>
                      <label
                        htmlFor="imageUpload"
                        className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                      >
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
                onClick={() => handleSubmit("Draft")}
                className="px-6 py-2 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300"
              >
                Draft
              </button>
              <button
                onClick={() => handleSubmit("Publik")}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Kirim
              </button>
            </div>

            {/* Konfirmasi jika sudah disubmit */}
            {isSubmitted && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-500 rounded">
                Panduan berhasil dikirim!
              </div>
            )}
          </div>
        </div>
      </NavbarAdmin>
      <FooterAdmin />
    </div>
  );
}

export default TambahPanduan;
