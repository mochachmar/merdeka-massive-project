import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Card from '../components/Card.jsx';
import arrowBack from '../assets/arrow-back.svg';
import Author from '../assets/Author.svg';
import axios from 'axios';

function Article() {
  const { id } = useParams(); // Mengambil ID dari URL
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);

        // Fetch artikel berdasarkan ID
        const response = await axios.get(`http://localhost:5000/api/articles/${id}`);
        console.log("Fetched Article:", response.data); // Debug
        setArticle(response.data);

        // Fetch artikel terkait, kecuali artikel saat ini
        const relatedResponse = await axios.get('http://localhost:5000/api/articles');
        setRelatedArticles(
          relatedResponse.data
            .filter((item) => item.id.toString() !== id) // Pastikan tipe datanya cocok
            .slice(0, 3)
        );
      } catch (err) {
        console.error("Error fetching article:", err); // Debug
        if (err.response && err.response.status === 404) {
          setError('Artikel tidak ditemukan.');
        } else {
          setError('Gagal memuat artikel.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]); // Jalankan ulang jika ID berubah

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!article) {
    return <p className="text-center text-red-500">Artikel tidak ditemukan.</p>;
  }

  return (
    <main className="w-full min-h-screen bg-gray-100">
      <Navbar />

      <section className="hero w-full mt-8 md:mt-8">
        <div className="flex items-center mb-2 px-4 md:px-16">
          <button onClick={() => window.history.back()} className="text-gray-700 hover:text-gray-900 flex items-center">
            <img src={arrowBack} alt="Kembali" className="mr-2" />
            <p className="font-medium text-xl">Kembali</p>
          </button>
        </div>

        <div className="text-center mb-8 px-4 md:px-16">
          <img
            src={article.img || 'default-image.png'}
            alt={article.title}
            className="mx-auto rounded-lg shadow-lg w-full h-64 md:h-96 object-cover"
          />
          <h2 className="mt-4 text-3xl font-bold text-gray-800">{article.title}</h2>
        </div>

        <div className="flex justify-center items-center gap-x-2 mb-6 text-gray-600">
          <img src={Author} alt="Penulis" className="h-5 w-5" />
          <p>{article.author || 'Penulis Tidak Diketahui'}</p>
          <span>•</span>
          <p>{article.date}</p>
        </div>

        <div className="prose max-w-full text-gray-700 leading-relaxed text-lg p-6 md:p-16 bg-white shadow-md rounded-lg">
          {article.content}
        </div>

        <hr className="w-20 h-1 mx-auto my-10 bg-gray-300 border-0 rounded" />

        <h1 className="text-black text-center font-semibold text-3xl mb-8">Berita Lainnya</h1>

        <div className="flex justify-center gap-6 flex-wrap px-4 pb-10">
          {relatedArticles.map((relatedArticle) => (
            <Card key={relatedArticle.id} article={relatedArticle} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Article;
