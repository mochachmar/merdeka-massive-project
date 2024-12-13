import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
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

const IdentifikasiAI = () => {
  const [predictions, setPredictions] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const detectPlant = async () => {
      if (!location.state?.imageFile) {
        console.log('No image file found in location state');
        return;
      }

      console.log('Starting plant detection process...');
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
        const predictionData = response.data.detail.predictions;
        setPredictions(predictionData);
        setImage(response.data.detail.image);
      } catch (error) {
        console.error('Error in plant detection:', error);
        alert('Gagal mengambil data prediksi. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    detectPlant();
  }, [location.state]);

  // Untuk upload ke backend lokal
  useEffect(() => {
    const uploadPlantData = async () => {
      if (!location.state?.imageFile || predictions.length === 0) {
        return;
      }

      const formData = new FormData();
      formData.append('file', location.state.imageFile);
      formData.append('plant_name', location.state.plantType);
      formData.append('scientific_name', plantsData[location.state.plantType]?.scientificName || 'Scientific name not found');
      formData.append('description', predictions[0].class_name || 'tanaman ini blablablabal');
      formData.append('care_intructions', predictions[0]?.solution || 'rawat dan sirami tiap hari');
      formData.append('created_by', '1');

      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8080/api/upload-tanaman',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // tetap true untuk backend lokal
        });
      } catch (error) {
        console.error('Error uploading plant data:', error);
      }
    };

    if (predictions.length > 0) {
      uploadPlantData();
    }
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
          <Link to="/deteksi-penyakit" className="flex items-center text-black font-semibold text-sm ml-4">
            <ArrowBackOutline className="mr-5" color="black" height="50px" width="30px" />
            Kembali
          </Link>
          <Link to="/histori-tanaman" className="text-black font-semibold text-sm mr-4">
            Tanaman Saya
          </Link>
        </div>

        {image && predictions.length > 0 && (
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

        <div className="flex justify-center mb-4">{location.state?.imageFile && <img src={URL.createObjectURL(location.state.imageFile)} alt="Uploaded Plant" className="mb-4 min-w-56 max-h-56 h-auto mx-4" />}</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mb-12">
          <div className="bg-transparent bg-opacity-50 border border-[#45543D] shadow-lg rounded-lg p-4 h-fit">
            <h3 className="text-lg font-bold mb-2 text-center flex items-center justify-center">
              <LeafOutline className="mr-2" color="black" height="20px" width="20px" />
              Spesifikasi Tanaman
            </h3>
            <p>{predictions.length > 0 ? predictions[0].class_label : 'Memuat...'}</p>
          </div>

          <div className="bg-transparent bg-opacity-50 border border-[#45543D] shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-center flex items-center justify-center">
              <ScanOutline className="mr-2" color="black" height="20px" width="20px" />
              Penilaian Kesehatan/Penyakit
            </h3>
            <ReactMarkdown>{predictions.length > 0 ? predictions[0].solution : 'Memuat...'}</ReactMarkdown>
          </div>
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default IdentifikasiAI;
