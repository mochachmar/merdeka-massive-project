import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../index.css';
import { ArrowBackOutline, LeafOutline, ScanOutline } from 'react-ionicons';
import Navbar from '../components/Navbar-Login';
import Footer from '../components/FooterLogin';
import ReactMarkdown from 'react-markdown';

const plantsData = {
  tomato: { name: 'Tomat', scientificName: 'Solanum lycopersicum' },
  cucumber: { name: 'Mentimun', scientificName: 'Cucumis sativus' },
  lettuce: { name: 'Selada', scientificName: 'Lactuca sativa' },
  spinach: { name: 'Bayam', scientificName: 'Spinacia oleracea' },
  chili: { name: 'Cabai', scientificName: 'Capsicum annuum' },
  strawberry: { name: 'Stroberi', scientificName: 'Fragaria × ananassa' },
  melon: { name: 'Melon', scientificName: 'Cucumis melo' },
};

const HasilRiwayatDeteksi = () => {
  const [predictions, setPredictions] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [careInstructions, setCareInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const detectCalled = useRef(false);
  const uploadCalled = useRef(false);

  useEffect(() => {
    const detectPlant = async () => {
      if (location.state?.isHistory) {
        // Jika diakses dari histori, gunakan data yang ada
        const { plantData } = location.state;
        if (plantData) {
          setPredictions([{ class_label: plantData.plant_name, solution: plantData.care_instructions }]);
          setDescription(plantData.description);
          setCareInstructions(plantData.care_instructions);
          setImage(plantData.photo_url); // Asumsikan photo_url adalah URL yang dapat diakses
        }
        return;
      }

      // Jika bukan dari histori, lakukan deteksi seperti biasa
      if (!location.state?.imageFile || detectCalled.current) {
        return;
      }

      detectCalled.current = true; // Tandai proses sudah dijalankan
      setLoading(true);

      const formData = new FormData();
      formData.append('image', location.state.imageFile);
      formData.append('plant_type', location.state.plantType);

      try {
        const response = await axios({
          method: 'post',
          url: 'https://tanamanku-api.1ojgx14h1gp0.jp-tok.codeengine.appdomain.cloud/api/v1/predict/',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
          withCredentials: false, // ubah menjadi false untuk API eksternal
        });

        console.log('Prediction API response received successfully');
        setPredictions(response.data.detail.predictions);
        setImage(response.data.detail.image);
      } catch (error) {
        console.error('Error in plant detection:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Gagal mengambil data prediksi. Silakan coba lagi.',
        });
      } finally {
        setLoading(false);
      }
    };

    detectPlant();
  }, [location.state]);

  // Untuk upload ke backend lokal, hanya jika bukan dari histori
  useEffect(() => {
    const uploadPlantData = async () => {
      if (location.state?.isHistory || !location.state?.imageFile || predictions.length === 0 || uploadCalled.current) {
        return;
      }

      // Mapping hasil prediksi ke health_status dan disease_name
      let health_status = 'healthy'; // Default
      let disease_name = 'None'; // Default

      // Contoh mapping berdasarkan confidence atau logic tertentu
      const topPrediction = predictions[0];
      if (topPrediction.confidence < 0.5) {
        health_status = 'unhealthy';
        disease_name = topPrediction.class_label || 'Unknown';
      } else {
        health_status = 'healthy';
        disease_name = 'None';
      }

      uploadCalled.current = true;

      const formData = new FormData();
      formData.append('file', location.state.imageFile);
      formData.append('plant_name', location.state.plantType);
      formData.append('scientific_name', plantsData[location.state.plantType]?.scientificName || 'Scientific name not found');
      formData.append('description', topPrediction.class_label || 'No description');
      formData.append('care_instructions', topPrediction.solution || 'No care instructions');
      formData.append('health_status', health_status);
      formData.append('disease_name', disease_name);
      // Hapus formData.append('created_by', '2'); // Hapus baris ini karena backend akan mengatur

      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3000/api/upload-tanaman',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // tetap true untuk backend lokal
        });
        console.log('Response:', response.data);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Deteksi dan penyimpanan berhasil!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (error) {
        console.error('Error uploading plant data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Gagal menyimpan data. Coba lagi.',
        });
      }
    };

    uploadPlantData();
  }, [predictions, location.state]);

  return (
    <div className="flex flex-col min-h-screen w-full m-0 p-0 relative">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
        </div>
      )}

      <Navbar />

      <div className="flex-grow relative mt-4 mx-auto w-full max-w-4xl px-4">
        <div className="flex justify-between items-center mb-4">
          <Link to={location.state?.isHistory ? '/histori-tanaman' : '/deteksi-penyakit'} className="flex items-center text-black font-semibold text-sm ml-4">
            <ArrowBackOutline className="mr-5" color="black" height="50px" width="30px" />
            Kembali
          </Link>
          {!location.state?.isHistory && (
            <Link to="/histori-tanaman" className="text-black font-semibold text-sm mr-4">
              Riwayat Deteksi Tanaman
            </Link>
          )}
        </div>

        {location.state?.isHistory
          ? // Jika diakses dari histori
            image && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Hasil Deteksi</h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <img src={`http://localhost:3000/${image}`} alt="Hasil Prediksi" className="w-full object-contain rounded-lg border" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mb-12">
                    <div className="bg-transparent bg-opacity-50 border border-[#45543D] shadow-lg rounded-lg p-4 h-fit">
                      <h3 className="text-lg font-bold mb-2 text-center flex items-center justify-center">Spesifikasi Tanaman</h3>
                      <ReactMarkdown>{description}</ReactMarkdown>
                    </div>
                    <div className="bg-transparent bg-opacity-50 border border-[#45543D] shadow-lg rounded-lg p-4">
                      <h3 className="text-lg font-bold mb-2 text-center flex items-center justify-center">Penilaian Kesehatan/Penyakit</h3>
                      <ReactMarkdown>{careInstructions}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            )
          : // Jika deteksi baru
            image &&
            predictions.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Hasil Deteksi</h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <img src={`data:image/png;base64,${image}`} alt="Hasil Prediksi" className="w-full object-contain rounded-lg border" />
                  </div>
                  <div className="flex-1">
                    {predictions.map((prediction, index) => (
                      <div key={index} className="bg-transparent bg-opacity-50 border border-[#45543D] shadow-lg rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-bold mb-2 text-center">{prediction.class_label}</h3>
                        <ReactMarkdown>{prediction.solution}</ReactMarkdown>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default HasilRiwayatDeteksi;
