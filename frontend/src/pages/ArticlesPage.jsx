import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
import Card from "../components/Card.jsx";
import gambarBanner from "../assets/hero-section.png";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  // Fetch articles from the backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/articles");
        console.log(response.data); // Debugging: memastikan data diterima

        const publishedArticles = response.data.filter(
          (article) => article.status === "published"
        );

        setArticles(publishedArticles); // Menyimpan artikel yang sudah difilter ke state
        console.log(publishedArticles); // Debugging: memastikan filter berjalan
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div
        className="relative bg-cover bg-center h-72 flex items-center justify-center"
        style={{
          backgroundImage: `url(${gambarBanner})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-lg"></div>
        <h1 className="text-white text-center text-3xl font-semibold relative z-10">
          Temukan artikel dan perawatan untuk <br />
          meningkatkan kualitas tanaman anda!
        </h1>
      </div>

      <h1 className="text-center text-4xl font-bold py-4">
        Artikel Penyakit & Hama
      </h1>
      <p className="text-center text-xl font-regular">
        Artikel Penyakit & Hama pada tanaman
      </p>
      <div className="flex flex-row flex-wrap gap-10 pt-8 mx-20 justify-center py-6">
        {articles.length > 0 ? (
          articles.map((article) => <Card article={article} key={article.id} />)
        ) : (
          <p className="text-center text-gray-700">
            Tidak ada artikel tersedia
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ArticlesPage;
