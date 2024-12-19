import React, { useState } from "react";
import Navbar from "../components/Navbar-Login";
import Footer from "../components/FooterLogin";
import { CloseOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function UpgradePro() {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

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
          <label className="block text-gray-700 text-sm font-semibold mb-1">Jenis Tanaman</label>
          <input
            type="text"
            placeholder="Jenis Tanaman"
            readOnly
            className="w-full border-b-2 border-gray-300 focus:border-gray-400 outline-none text-gray-600 placeholder-gray-400 py-2"
          />

          {/* File Input */}
          <input type="file" accept="image/*" style={{ display: "none" }} />

          <div className="flex mt-8">
            <button className="flex items-center px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100">
              <span className="text-xl mr-2">+</span> Unggah Foto
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 ml-2">
              <span className="text-xl mr-2">+</span> Potret
            </button>
          </div>

          <div className="flex justify-end mt-8">
            <button className="w-full max-w-28 bg-[#6D7E5E] text-white font-semibold py-2 border border-white rounded-lg">
              Deteksi
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg relative">
            {/* Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              <CloseOutline color={"#00000"} height="30px" width="30px" />
            </button>

            {/* Modal Content */}
            <p className="text-gray-700 mb-6 text-lg text-left">
              Penggunaan Anda telah mencapai batas maksimal. Silakan upgrade untuk menikmati akses tanpa batas ke fitur deteksi AI.
            </p>

            {/* Upgrade Button */}
            <div className="flex justify-end">
              <button
                className="flex items-center bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                onClick={() => navigate("/upgrade-plan")} // Navigate to UpgradePlan
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UpgradePro;
