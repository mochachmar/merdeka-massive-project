import React, { useEffect, useState } from "react"; // Import necessary hooks
import { useNavigate } from "react-router-dom";
import NavbarLogin from "../components/Navbar-Login"; // Import NavbarLogin
import Footer from "../components/FooterLogin"; // Use FooterLogin
import Card from "../components/Card"; // Import Card component
import homeImage from "../assets/home.jpg";
import iconDetek from "../assets/ikondetek.png";
import iconUnduh from "../assets/ikonunduh.svg";
import iconGrow from "../assets/ikongrow.svg";
import tentangKamiImage from "../assets/tentangkami.jpg";

function BerandaLogin() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]); // State to store articles
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch articles from the API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/articles"); // API URL for fetching articles
        const data = await response.json();
        setArticles(data); // Store fetched articles in state
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavbarLogin />
      {/* Hero Section */}
      <section className="relative">
        <img
          src={homeImage}
          alt="Tanaman Hidroponik"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-end">
          <div className="text-left text-white p-6 md:px-16 lg:px-32">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Solusi Perawatan
            </h1>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Tanaman Hidroponik
            </h2>
            <p className="max-w-lg text-sm md:text-base text-left">
              TanamanKu hadir sebagai solusi cerdas dalam merawat tanaman
              hidroponik Anda. Dengan teknologi Artificial Intelligence (AI),
              aplikasi ini dapat membantu mendeteksi kesehatan tanaman
              hidroponik, memberikan rekomendasi perawatan yang tepat, dan
              memastikan tanaman hidroponik tumbuh optimal di lingkungan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Fitur TanamanKu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div
              onClick={() => navigate("/deteksi-penyakit")}
              className="cursor-pointer bg-[#6D7E5E] p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 duration-300 hover:shadow-lg"
            >
              <img
                src={iconDetek}
                alt="AI Detection"
                className="mx-auto mb-4 w-12 h-12"
              />
              <p className="text-sm text-white text-left">
                AI kami mampu mendeteksi berbagai penyakit dan hama yang dapat
                menyerang tanaman Anda. Cukup unggah foto tanaman, dan sistem
                kami akan memberikan diagnosis serta langkah-langkah perawatan.
              </p>
            </div>

            <div
              onClick={() => navigate("/artikel-penyakit-tanaman-login")}
              className="cursor-pointer bg-[#6D7E5E] p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 duration-300 hover:shadow-lg"
            >
              <img
                src={iconUnduh}
                alt="Articles"
                className="mx-auto mb-4 w-12 h-12"
              />
              <p className="text-sm text-white text-left">
                Jelajahi berbagai artikel yang memberikan tips dan trik
                perawatan tanaman hidroponik. Dari pemula hingga ahli, temukan
                inspirasi dan panduan yang tepat untuk menjaga tanaman Anda
                tetap sehat dan subur.
              </p>
            </div>

            <div
              onClick={() => navigate("/panduan-login")}
              className="cursor-pointer bg-[#6D7E5E] p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 duration-300 hover:shadow-lg"
            >
              <img
                src={iconGrow}
                alt="Guide Download"
                className="mx-auto mb-4 w-12 h-12"
              />
              <p className="text-sm text-white text-left">
                Unduh panduan lengkap tips dan trik perawatan tanaman
                hidroponik, mulai dari pemula hingga ahli. Dapatkan inspirasi
                dan cara tepat menjaga tanaman Anda tetap sehat dan subur!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12 bg-[#E7F0DC]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Artikel</h2>
          <p className="text-center text-gray-900 mb-6">
            Kami menyediakan artikel / blog yang dapat anda akses mengenai
            informasi penyakit dan perawatan tanaman dari sumber terpercaya.
          </p>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading ? (
                <p className="text-center text-gray-900">Loading articles...</p>
              ) : (
                articles
                  .filter((article) => article.status === "published") // Hanya tampilkan artikel "published"
                  .slice(0, 3)
                  .map((article) => <Card key={article.id} article={article} />)
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/artikel-penyakit-tanaman-login")}
            className="mt-6 bg-[#6D7E5E] text-white px-6 py-2 rounded-md border-2 border-[#45543D]"
          >
            Selengkapnya
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-5 flex flex-col md:flex-row items-center">
          <img
            src={tentangKamiImage}
            alt="About TanamanKu"
            className="mx-auto object-cover rounded-lg shadow-md"
            style={{ width: "500px", height: "300px" }}
          />
          <div className="md:ml-8">
            <h2 className="text-3xl font-bold mb-4">
              <br />
              Mengapa Memilih TanamanKu?
            </h2>
            <p className="text-gray-900 text-left">
              TanamanKu menggabungkan teknologi mutakhir dengan keindahan alam.
              AI kami didesain untuk memberikan panduan yang mudah dipahami oleh
              pemula, namun tetap akurat untuk para pecinta tanaman hidroponik
              yang berpengalaman. Solusi lengkap untuk setiap langkah merawat
              tanaman, dari bibit hingga dewasa.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default BerandaLogin;
