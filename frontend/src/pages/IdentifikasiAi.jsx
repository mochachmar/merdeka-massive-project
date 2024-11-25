import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../index.css";
import { ArrowBackOutline, LeafOutline, ScanOutline } from "react-ionicons";
import tomat from "../assets/tomat.jpg"; // Gambar tomat di file manager Anda
import Navbar from "../components/Navbar-Login";
import Footer from "../components/FooterLogin";

const IdentifikasiAI = () => {
  // State untuk menyimpan hasil API
  const [className, setClassName] = useState("");
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mengirim data ke API
  const handlePredict = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", new File([tomat], "tomat.jpg")); // Pastikan gambar dikirim sebagai File
    formData.append("plant_type", "tomato");

    try {
      console.log("Mengirim permintaan ke API...");
      const response = await axios.post(
        "https://application-2c.1ojgx14h1gp0.jp-tok.codeengine.appdomain.cloud/api/v1/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Log respons penuh
      console.log("Respons API:", response.data);

      // Ambil data dari respons
      const prediction = response.data.predictions[0];
      console.log("Prediction:", prediction);

      setClassName(prediction.class_name);
      setSolution(prediction.solution);
    } catch (error) {
      if (error.response) {
        console.error("API Error Response:", error.response.data);
      } else if (error.request) {
        console.error("No Response from API:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      setClassName("Gagal mengambil data.");
      setSolution("Gagal mengambil data. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full m-0 p-0">
      {/* Navbar */}
      <Navbar />

      <div className="flex-grow relative mt-4 mx-auto w-full max-w-4xl px-4">
        {/* Back and History Links */}
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

        {/* Centered Image */}
        <div className="flex justify-center mb-4">
          <img
            src={tomat}
            alt="Tomato Plant"
            className="mb-4 min-w-56 max-h-56 h-auto mx-4"
          />
        </div>

        {/* Button to trigger API call */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handlePredict}
            className="bg-[#45543D] text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-[#5a6b4a]"
          >
            {loading ? "Memuat..." : "Identifikasi"}
          </button>
        </div>

        {/* Display Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {/* Plant Specification Card */}
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
            {className ? (
              <p>{className}</p>
            ) : (
              <p>
                Klik tombol "Identifikasi" untuk melihat spesifikasi tanaman.
              </p>
            )}
          </div>

          {/* Health Assessment Card */}
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
            {solution ? (
              <p>{solution}</p>
            ) : (
              <p>
                Klik tombol "Identifikasi" untuk melihat hasil analisis
                kesehatan tanaman.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer stays at the bottom */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default IdentifikasiAI;
