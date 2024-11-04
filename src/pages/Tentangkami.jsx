import React from 'react';

const Tentangkami = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-8 lg:px-16">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">TENTANG KAMI</h2>
      </div>

      {/* Grid Layout for Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Section with Image-Text Pairs */}
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <img src="image1.jpg" alt="Tentang Kami 1" className="w-1/3 h-auto rounded-md object-cover" />
            <p className="text-gray-700 flex-1">
              Memberikan akses mudah ke teknologi AI yang mampu mendeteksi penyakit dan pertumbuhan tanaman secara akurat, 
              membantu pengguna merawat tanaman dengan lebih baik.
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <img src="image2.jpg" alt="Tentang Kami 2" className="w-1/3 h-auto rounded-md object-cover" />
            <p className="text-gray-700 flex-1">
              Meningkatkan kesadaran akan pentingnya merawat tanaman hias sebagai bagian dari gaya hidup hijau dan berkelanjutan.
            </p>
          </div>
        </div>

        {/* Right Section with Text-Image Pairs */}
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <p className="text-gray-700 flex-1">
              Menjadi platform digital terdepan dalam perawatan tanaman hias, yang memanfaatkan teknologi AI untuk memberikan solusi 
              cerdas dan personal kepada setiap pecinta tanaman di seluruh dunia.
            </p>
            <img src="image3.jpg" alt="Tentang Kami 3" className="w-1/3 h-auto rounded-md object-cover" />
          </div>
          <div className="flex items-start space-x-4">
            <p className="text-gray-700 flex-1">
              Menyediakan panduan perawatan yang disesuaikan dengan kebutuhan setiap jenis tanaman hias, dari pemula hingga ahli, 
              melalui artikel dan blog yang informatif.
            </p>
            <img src="image4.jpg" alt="Tentang Kami 4" className="w-1/3 h-auto rounded-md object-cover" />
          </div>
        </div>
      </div>

      {/* Inspiration and Ideas Section */}
      <div className="mt-16 text-center bg-gray-100 py-12 px-8 rounded-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">INSPIRASI DAN IDE</h3>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          TanamanKu adalah platform inovatif berbasis AI yang dirancang untuk membantu Anda merawat tanaman hias dengan lebih mudah dan efektif.
          Mulai dari deteksi penyakit hingga panduan perawatan, TanamanKu memberikan solusi cerdas yang dapat diakses di mana saja.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700">Daftar</button>
          <button className="border border-green-600 text-green-600 py-2 px-6 rounded-md hover:bg-green-100">Masuk</button>
        </div>
      </div>
    </div>
  );
};

export default Tentangkami;
