import React, { useState } from "react";
import { Link } from "react-router-dom"; // Tambahkan impor ini
import { ArrowBackOutline } from "react-ionicons"; // Tambahkan jika menggunakan ionicons
import Navbar from "../components/Navbar-Login";
import Footer from "../components/FooterLogin";
import logoTanamanKu from "../assets/logo2.png";
import CardPayment from "../components/CardPayment";
import CardTransaksiBerhasil from "../components/CardTransaksiBerhasil";

const Payment = () => {
  const [showCard, setShowCard] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 ">
          <Link
            to="/beranda-login"
            className="flex items-center text-black font-semibold text-sm mb-4"
          >
            {" "}
            {/* Menambahkan margin bawah (mb-4) */}
            <ArrowBackOutline
              className="mr-2"
              color="black"
              height="20px"
              width="20px"
            />
            Kembali
          </Link>
          <h1 className="text-2xl font-bold mb-10">Checkout</h1>{" "}
          {/* Jarak antara judul "Checkout" dan "Kembali" sudah ada karena mb-10 */}
          {/* Payment Section */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-6">
              <img
                src={logoTanamanKu}
                alt="TanamanKu Logo"
                className="h-20 w-30 mr-2"
              />
              <p className="text-gray-700 font-semibold">Rp. 25.000</p>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Mulai 18 Maret 2024: Rp. 25.000
            </p>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Alamat Email
              </label>
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {/* Ringkasan */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-bold mb-4">Ringkasan</h2>
              <div className="flex justify-between mb-2">
                <p className="text-gray-700">Total:</p>
                <p className="font-medium">Rp 25.000</p>
              </div>
              <div className="flex justify-between font-semibold text-gray-900">
                <p>Total Dibayar:</p>
                <p>Rp 25.000</p>
              </div>
            </div>

            {/* Bayar Button */}
            <div className="mt-6 text-right">
              <button
                className="w-40 bg-[#6D7E5E] text-white py-2 rounded-md hover:bg-[#91A079] transition"
                onClick={() => setShowCard(true)}
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* CardPayment Modal */}
      {showCard && (
        <CardPayment
          email={email}
          onSubmit={() => {
            setShowCard(false);
            setShowSuccessCard(true);
          }}
          onCancel={() => setShowCard(false)}
        />
      )}

      {/* CardTransaksiBerhasil */}
      {showSuccessCard && (
        <CardTransaksiBerhasil
          amount="25.000"
          orderNumber="1Y2HH6KYU"
          date="18 Desember 2024"
          userName="Masda Naswa"
          productCount={1}
          onClose={() => setShowSuccessCard(false)} // Properti onClose ditambahkan
        />
      )}

      <Footer />
    </div>
  );
};

export default Payment;
