import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar-Login";
import Footer from "../components/FooterLogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
const plantsData = [
  { name: "Tomat", key: "tomato" },
  { name: "Mentimun", key: "cucumber" },
  { name: "Selada", key: "lettuce" },
  { name: "Bayam", key: "spinach" },
  { name: "Cabai", key: "chili" },
  { name: "Stroberi", key: "strawberry" },
  { name: "Melon", key: "melon" },
];
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

function DeteksiPenyakit() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [plantType, setPlantType] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Mendapatkan Base64 dari kamera
    const imageFile = dataURLtoFile(imageSrc, "capture.jpg"); // Konversi Base64 ke file

    setPreviewImage({
      image: imageFile, // File yang akan dikirimkan
      display: URL.createObjectURL(imageFile), // URL untuk ditampilkan di <img>
    });

    setIsCameraOpen(false); // Menutup kamera
  };

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

  // const recognizePlant = (fileName) => {
  //   const lowerName = fileName.toLowerCase();
  //   if (lowerName.includes("tomat")) {
  //     setPlantName("Tomat");
  //   } else if (lowerName.includes("sawi")) {
  //     setPlantName("Sawi");
  //   } else if (lowerName.includes("pakcoy")) {
  //     setPlantName("Pakcoy");
  //   } else {
  //     setPlantName("Tanaman Tidak Dikenal");
  //   }
  // };

  // const handleDeteksiClick = async () => {
  //   if (!previewImage || (!previewImage.file && !previewImage.base64)) {
  //     alert("Harap unggah gambar atau ambil foto terlebih dahulu.");
  //     return;
  //   }

  //   setLoading(true);

  //   const formData = new FormData();
  //   if (previewImage.file) {
  //     formData.append("file", previewImage.file);
  //   } else if (previewImage.base64) {
  //     formData.append("file", previewImage.base64);
  //   }
  //   console.log(plantType);
  //   formData.append("plant_name", plantType);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/upload-tanaman",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     console.log("Response:", response.data);
  //     alert("Deteksi berhasil!");
  //     navigate("/identifikasi-ai");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Gagal mengunggah gambar. Coba lagi.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      <div className="flex flex-col items-center flex-grow p-6 md:p-14 bg-gray-50">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Deteksi Penyakit Tanaman Anda
        </h1>

        <div className="w-full max-w-xl space-y-6">
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

          {isCameraOpen ? (
            <div className="flex flex-col items-center">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-auto max-h-64 object-cover rounded-lg border border-gray-300"
              />
              <button
                className="mt-4 px-4 py-2  bg-[#6D7E5E] text-white rounded-lg"
                onClick={handleCapture}
              >
                Ambil Foto
              </button>
              <button
                className="mt-2 px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setIsCameraOpen(false)}
              >
                Batal
              </button>
            </div>
          ) : (
            previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage.display}
                  alt="Preview"
                  className="w-full h-auto max-h-64 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )
          )}

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <div className="flex space-x-4">
            <button
              className="flex items-center px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={handleUploadClick}
            >
              <span className="text-xl mr-2">+</span>Unggah Foto
            </button>

            <button
              className="flex items-center px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-green-100"
              onClick={() => setIsCameraOpen(true)}
            >
              <span className="text-xl mr-2">+</span>Potret
            </button>
          </div>
          <div className="flex justify-end mt-8">
            <button
              className={`w-full max-w-28  bg-[#6D7E5E] text-white font-semibold py-2 border border-green-700 rounded-lg ${
                loading ? "opacity-50" : ""
              }`}
              onClick={handleDeteksiClick}
              disabled={loading}
            >
              {loading ? "Memproses..." : "Deteksi"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DeteksiPenyakit;
