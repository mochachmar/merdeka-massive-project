import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../index.css";
import { ArrowBackOutline, LeafOutline, ScanOutline } from "react-ionicons";
import Navbar from "../components/Navbar-Login";
import Footer from "../components/FooterLogin";
import ReactMarkdown from "react-markdown";

const IdentifikasiAI = () => {
  const [predictions, setPredictions] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const detectPlant = async () => {
      if (!location.state?.imageFile) return;

      setLoading(true);
      const formData = new FormData();
      formData.append("image", location.state.imageFile);
      formData.append("plant_type", location.state.plantType);

      try {
        const response = await axios.post(
          "https://application-2c.1ojgx14h1gp0.jp-tok.codeengine.appdomain.cloud/api/v1/predict",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Mengambil data prediksi dari respons API
        const predictionData = response.data.detail.predictions;
        setPredictions(predictionData);

        // Mengambil gambar hasil prediksi (jika tersedia)
        setImage(response.data.detail.image);
      } catch (error) {
        console.error("Error:", error);
        alert("Gagal mengambil data prediksi. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    detectPlant();
  }, [location.state]);

  return (
    <div className="flex flex-col min-h-screen w-full m-0 p-0">
      <Navbar />

      <div className="flex-grow relative mt-4 mx-auto w-full max-w-4xl px-4">
        <div className="flex justify-between items-center mb-4">
          <Link
            to="/deteksi-penyakit"
            className="flex items-center text-black font-semibold text-sm ml-4"
          >
            <ArrowBackOutline
              className="mr-5"
              color="black"
              height="50px"
              width="30px"
            />
            Kembali
          </Link>
          <Link
            to="/histori-tanaman"
            className="text-black font-semibold text-sm mr-4"
          >
            Tanaman Saya
          </Link>
        </div>

        {/* Tampilan Hasil Prediksi */}
        {image && predictions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Hasil Deteksi
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Gambar Prediksi */}
              <div className="flex-1">
                <img
                  src={`data:image/png;base64,${image}`}
                  alt="Hasil Prediksi"
                  className="w-full object-contain rounded-lg border"
                />
              </div>

              {/* Prediksi Detail */}
              <div className="flex-1">
                {predictions.map((prediction, index) => (
                  <div
                    key={index}
                    className="bg-transparent bg-opacity-50 border border-[#45543D] shadow-lg rounded-lg p-4 mb-4"
                  >
                    <h3 className="text-lg font-bold mb-2 text-center">
                      {prediction.class_label}
                    </h3>
                    <ReactMarkdown>{prediction.solution}</ReactMarkdown>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tampilan sebelumnya tetap dipertahankan */}
        <div className="flex justify-center mb-4">
          {location.state?.imageFile && (
            <img
              src={URL.createObjectURL(location.state.imageFile)}
              alt="Uploaded Plant"
              className="mb-4 min-w-56 max-h-56 h-auto mx-4"
            />
          )}
        </div>

        <div className="flex justify-center mb-6">
          <button
            disabled={loading}
            className="bg-[#45543D] text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-[#5a6b4a]"
          >
            {loading ? "Memuat..." : "Identifikasi"}
          </button>
        </div>

        {/* Bagian spesifikasi dan penilaian lama dipertahankan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <div className="bg-transparent bg-opacity-50 border border-[#45543D] shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-center flex items-center justify-center">
              <LeafOutline
                className="mr-2"
                color="black"
                height="20px"
                width="20px"
              />
              Spesifikasi Tanaman
            </h3>
            <p>
              {predictions.length > 0
                ? predictions[0].class_label
                : "Klik tombol Identifikasi untuk melihat spesifikasi tanaman."}
            </p>
          </div>

          <div className="bg-transparent bg-opacity-50 border border-[#45543D] shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-center flex items-center justify-center">
              <ScanOutline
                className="mr-2"
                color="black"
                height="20px"
                width="20px"
              />
              Penilaian Kesehatan/Penyakit
            </h3>
            <ReactMarkdown>
              {predictions.length > 0
                ? predictions[0].solution
                : "Klik tombol Identifikasi untuk melihat hasil analisis kesehatan tanaman."}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default IdentifikasiAI;