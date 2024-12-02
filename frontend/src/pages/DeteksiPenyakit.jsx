import React, { useState } from "react";
import Navbar from "../components/Navbar-Login";
import Footer from "../components/FooterLogin";
import { useNavigate } from "react-router-dom";

// Data tanaman
const plantsData = [
  { name: "Tomat", key: "tomato" },
  { name: "Mentimun", key: "cucumber" },
];

function DeteksiPenyakit() {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState({
    image: null,
    display: null,
  });
  const [plantType, setPlantType] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewImage({
        image: file,
        display: URL.createObjectURL(file),
      });
    } else {
      alert("Harap unggah file gambar yang valid.");
    }
  };

  const handleDeteksiClick = () => {
    if (!previewImage.image) {
      alert("Harap unggah gambar terlebih dahulu.");
      return;
    }

    if (!plantType) {
      alert("Harap pilih tipe tanaman.");
      return;
    }

    // Navigasi ke halaman IdentifikasiAI dengan membawa data gambar dan tipe tanaman
    navigate("/identifikasi-ai", {
      state: {
        imageFile: previewImage.image,
        plantType: plantType,
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-full m-0 p-0">
      {/* Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center flex-grow p-4 md:p-14 bg-gray-50">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-8 md:mb-24 text-center">
          Mengenali penyakit pada tanaman anda
        </h1>

        <div className="w-full max-w-xl space-y-4">
          {/* Dropdown Tipe Tanaman */}
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Jenis Tanaman
          </label>
          <select
            value={plantType}
            onChange={(e) => setPlantType(e.target.value)}
            className="w-full border-b-2 border-gray-300 focus:border-gray-400 outline-none text-gray-600 py-2"
          >
            <option value="">Pilih Jenis Tanaman</option>
            {plantsData.map((plant) => (
              <option key={plant.key} value={plant.key}>
                {plant.name}
              </option>
            ))}
          </select>

          {/* Image Preview */}
          {previewImage.display && (
            <div className="mt-4">
              <img
                src={previewImage.display}
                alt="Preview"
                className="w-full h-auto max-h-64 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}

          {/* File Input */}
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="file-upload"
          />

          <div className="flex mt-8">
            <label
              htmlFor="file-upload"
              className="flex items-center px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <span className="text-xl mr-2">+</span> Unggah Foto
            </label>
          </div>

          <div className="flex justify-end mt-8">
            <button
              className="w-full max-w-28 bg-[#6D7E5E] text-white font-semibold py-2 border border-white rounded-lg"
              onClick={handleDeteksiClick}
            >
              Deteksi
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DeteksiPenyakit;
