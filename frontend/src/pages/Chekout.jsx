import React from "react";
import Navbar from "../components/Navbar-Login";
import Footer from "../components/FooterLogin";
import logoTanamanKu from "../assets/logo2.png";

const Checkout = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <button className="text-gray-500 text-sm mb-6">&larr; Kembali</button>
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          {/* Payment Section */}
          <div className="border-t border-gray-200 pt-4">
            {/* TanamanKu Section */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={logoTanamanKu}
                  alt="TanamanKu Logo"
                  className="h-20 w-30 mr-2"
                />
              </div>
              <p className="text-gray-700 font-semibold">Rp. 25.000</p>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Mulai 18 Maret 2024: Rp. 25.000
            </p>

            {/* Payment Methods */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3">Metode Pembayaran</h2>
              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alamat Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@mail.com"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#91A079]"
                />
              </div>

              {/* Virtual Account */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Virtual Account
                </p>
                <div className="flex flex-wrap gap-3">
                  <img
                    src="https://via.placeholder.com/50x30"
                    alt="BCA"
                    className="h-8"
                  />
                  <img
                    src="https://via.placeholder.com/50x30"
                    alt="Mandiri"
                    className="h-8"
                  />
                  <img
                    src="https://via.placeholder.com/50x30"
                    alt="BNI"
                    className="h-8"
                  />
                  <img
                    src="https://via.placeholder.com/50x30"
                    alt="BSI"
                    className="h-8"
                  />
                </div>
              </div>

              {/* Virtual Account Number Input */}
              <div className="mt-4">
                <label
                  htmlFor="no-va"
                  className="block text-sm font-medium text-gray-700"
                >
                  No Virtual Account
                </label>
                <input
                  type="text"
                  id="no-va"
                  placeholder="Nomor VA"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#91A079]"
                />
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-bold mb-4">Ringkasan</h2>
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">Total:</p>
              <p className="font-medium">Rp 25.000</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">Biaya Admin:</p>
              <p className="font-medium">Rp 0</p>
            </div>
            <div className="flex justify-between font-semibold text-gray-900">
              <p>Total Dibayar:</p>
              <p>Rp 25.000</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-right">
            <button className="w-40 bg-[#6D7E5E] text-white font-medium py-2 rounded-md hover:bg-[#91A079] transition duration-300">
              Bayar
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Checkout;
