import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar-Login";
import Footer from "../components/FooterLogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
import { useLanguage } from "../contexts/LanguageContext"; // Importing the language context

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

  const { t } = useLanguage(); // Accessing the translation function

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Getting the Base64 image from webcam
    const imageFile = dataURLtoFile(imageSrc, "capture.jpg"); // Convert Base64 to file

    setPreviewImage({
      image: imageFile, // The file to be uploaded
      display: URL.createObjectURL(imageFile), // URL for displaying the image in <img>
    });

    setIsCameraOpen(false); // Close the camera
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewImage({
        image: file,
        display: URL.createObjectURL(file),
      });
    } else {
      alert(t("invalidImageFile")); // Show an alert for invalid file type
    }
  };

  const handleDeteksiClick = () => {
    if (!previewImage.image) {
      alert(t("uploadImageFirst")); // Alert if no image is selected
      return;
    }

    if (!plantType) {
      alert(t("selectPlantType")); // Alert if no plant type is selected
      return;
    }

    // Navigate to the IdentifikasiAI page with the image and plant type data
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
          {t("plantDiseaseDetection")}
        </h1>

        <div className="w-full max-w-xl space-y-6">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            {t("plantType")}
          </label>
          <select
            value={plantType}
            onChange={(e) => setPlantType(e.target.value)}
            className="w-full border-b-2 border-gray-300 focus:border-gray-400 outline-none text-gray-600 py-2"
          >
            <option value="">{t("selectPlant")}</option>
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
                className="mt-4 px-4 py-2 bg-[#6D7E5E] text-white rounded-lg"
                onClick={handleCapture}
              >
                {t("capturePhoto")}
              </button>
              <button
                className="mt-2 px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setIsCameraOpen(false)}
              >
                {t("cancel")}
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
              <span className="text-xl mr-2">+</span>
              {t("uploadPhoto")}
            </button>

            <button
              className="flex items-center px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-green-100"
              onClick={() => setIsCameraOpen(true)}
            >
              <span className="text-xl mr-2">+</span>
              {t("takePhoto")}
            </button>
          </div>

          <div className="flex justify-end mt-8">
            <button
              className={`w-full max-w-28 bg-[#6D7E5E] text-white font-semibold py-2 border border-green-700 rounded-lg ${
                loading ? "opacity-50" : ""
              }`}
              onClick={handleDeteksiClick}
              disabled={loading}
            >
              {loading ? t("processing") : t("detect")}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DeteksiPenyakit;
