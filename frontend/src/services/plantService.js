// services/plantService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Sesuaikan dengan URL backend Anda

export const getPlantHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/history-tanaman`, {
      headers: {
        // Jika menggunakan autentikasi, tambahkan header authorization
        // 'Authorization': `Bearer ${token}`,
      },
      withCredentials: true, // Tambahkan ini jika diperlukan
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching plant history:', error);
    throw error;
  }
};

export const deleteAllPlantHistory = async () => {
  const response = await axios.delete(`${API_URL}/history-tanaman`, {
    // Jika diperlukan, tambahkan header autentikasi
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
