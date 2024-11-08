import React from "react";

function Beranda() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <img
          src="./src/assets/home.jpg" // Replace with the actual path of your image
          alt="Tanaman Hias"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-end">
          <div className="text-left text-white p-6 md:px-16 lg:px-32">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Solusi Perawatan
            </h1>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Tanaman Hias
            </h2>
            <p className="max-w-lg text-sm md:text-base text-left">
              TanamanKu hadir sebagai solusi cerdas dalam merawat tanaman hias
              Anda. Dengan teknologi Artificial Intelligence (AI), aplikasi ini
              dapat membantu mendeteksi kesehatan tanaman, memberikan
              rekomendasi perawatan yang tepat, dan memastikan tanaman tumbuh
              optimal di lingkungan Anda.
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
            <div className="bg-[#6D7E5E] p-6 rounded-lg shadow-md">
              <img
                src="./src/assets/ikondetek.png"
                alt="AI Detection"
                className="mx-auto mb-4 w-12 h-12"
              />
              <p className="text-sm text-white text-left">
                AI kami mampu mendeteksi berbagai penyakit dan hama yang dapat
                menyerang tanaman Anda. Cukup unggah foto tanaman, dan sistem
                kami akan memberikan diagnosis serta langkah-langkah perawatan.
              </p>
            </div>
            <div className="bg-[#6D7E5E] p-6 rounded-lg shadow-md">
              <img
                src="./src/assets/ikonunduh.svg"
                alt="Articles"
                className="mx-auto mb-4 w-12 h-12"
              />
              <p className="text-sm text-white text-left">
                Jelajahi berbagai artikel yang memberikan tips dan trik
                perawatan tanaman hias. Dari pemula hingga ahli, temukan
                inspirasi dan panduan yang tepat untuk menjaga tanaman Anda
                tetap sehat dan subur.
              </p>
            </div>
            <div className="bg-[#6D7E5E] p-6 rounded-lg shadow-md">
              <img
                src="./src/assets/ikongrow.svg"
                alt="Guide Download"
                className="mx-auto mb-4 w-12 h-12"
              />
              <p className="text-sm text-white text-left">
                Unduh panduan lengkap tips dan trik perawatan tanaman hias,
                mulai dari pemula hingga ahli. Dapatkan inspirasi dan cara tepat
                menjaga tanaman Anda tetap sehat dan subur!
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Article Card 1 */}
            <a href="/path-to-new-page" className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="./src/assets/mawar.jpeg"
                  alt="Article 1"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-600">
                    Minggu, 25 Oktober 2024
                  </p>
                  <h3 className="text-lg font-semibold">
                    Hama pada Bunga Mawar
                  </h3>
                  <p className="text-gray-900 mt-2 text-left">
                    Artikel ini membahas berbagai jenis hama yang sering
                    menyerang tanaman bunga mawar.
                  </p>
                </div>
              </div>
            </a>

            {/* Article Card 2 */}
            <a href="/path-to-new-page" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="./src/assets/melati.jpeg"
                alt="Article 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-600">Minggu, 25 Okt 2024</p>
                <h3 className="text-lg font-semibold">
                  Hama pada Bunga Melati
                </h3>
                <p className="text-gray-900 mt-2 text-left">
                  Artikel ini membahas berbagai jenis hama yang sering menyerang
                  tanaman bunga melati.
                </p>
              </div>
            </div>
            </a>

            {/* Article Card 3 */}
            <a href="/path-to-new-page" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="./src/assets/anggrek.jpeg"
                alt="Article 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-grey-600">
                  Minggu, 25 Oktober 2024
                </p>
                <h3 className="text-lg font-semibold">
                  Penyakit Jamur pada Daun
                </h3>
                <p className="text-gray-600 mt-2 text-left">
                  Artikel ini membahas berbagai jenis hama yang sering menyerang
                  tanaman bunga Anggrek.
                </p>
              </div>
            </div>
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-6 bg-[#6D7E5E] text-white px-6 py-2 rounded-md"
            style={{ border: "2px solid #45543D" }}
          >
            Selengkapnya
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <img
            src="./src/assets/tentangkami.jpg"
            alt="About TanamanKu"
            className="mx-auto object-cover rounded-lg shadow-md"
            style={{ width: "500px", height: "300px" }}
          />
          <div className="md:ml-8">
            <h2 className="text-3xl font-bold mb-4">
              Mengapa Memilih TanamanKu?
            </h2>
            <p className="text-gray-900 text-left">
              TanamanKu menggabungkan teknologi mutakhir dengan keindahan alam.
              AI kami didesain untuk memberikan panduan yang mudah dipahami oleh
              pemula, namun tetap akurat untuk para pecinta tanaman hias yang
              berpengalaman. Solusi lengkap untuk setiap langkah merawat
              tanaman, dari bibit hingga dewasa.
            </p>
            <button
              className="mt-6 bg-white text-black px-6 py-2"
              style={{ border: "2px solid #565E6D", float: "right" }}
            >
              Tentang Kami
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Beranda;
