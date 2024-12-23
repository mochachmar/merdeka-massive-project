import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowBackOutline } from "react-ionicons";
import Navbar from "../components/Navbar-Login";
import Footer from "../components/FooterLogin";
import logoTanamanKu from "../assets/logo2.png";
import BCA from "../assets/BCA.svg";
import Mandiri from "../assets/Mandiri.svg";
import BRI from "../assets/BRI.svg";
import BNI from "../assets/BNI.svg";
import BSI from "../assets/BSI.svg";
import Permata from "../assets/Permata.svg";
import CIMB from "../assets/CIMB.svg";
import Danamon from "../assets/Danamon.svg";
import CardPayment from "../components/CardPayment";
import CardTransaksiBerhasil from "../components/CardTransaksiBerhasil";

const Payment = () => {
  const [showCard, setShowCard] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);

  const banks = [
    { id: "bca", name: "BCA", image: BCA },
    { id: "mandiri", name: "Mandiri", image: Mandiri },
    { id: "bri", name: "BRI", image: BRI },
    { id: "bni", name: "BNI", image: BNI },
    { id: "bsi", name: "BSI", image: BSI },
    { id: "permata", name: "Permata", image: Permata },
    { id: "cimb", name: "CIMB", image: CIMB },
    { id: "danamon", name: "Danamon", image: Danamon },
  ];

  const handleBankSelection = (bankId) => {
    setSelectedBank(bankId);
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Link
            to="/beranda-login"
            className="flex items-center text-black font-semibold text-sm mb-4"
          >
            <ArrowBackOutline
              className="mr-2"
              color="black"
              height="20px"
              width="20px"
            />
            Kembali
          </Link>
          <h1 className="text-2xl font-bold mb-10">Checkout</h1>

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

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Pilih Metode Pembayaran
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => handleBankSelection(bank.id)}
                    className={`p-4 border rounded-lg transition-all duration-200 hover:border-[#91A079] hover:shadow-md flex items-center justify-center h-16 ${
                      selectedBank === bank.id
                        ? "border-[#91A079] bg-[#F5F7F3] shadow-md"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={bank.image}
                      alt={bank.name}
                      className="h-8 object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

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

            <div className="border-t border-gray-200 pt-6 mt-6">
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

            <div className="mt-6 text-right">
              <button
                className={`w-40 py-2 rounded-md transition-colors ${
                  selectedBank
                    ? "bg-[#6D7E5E] hover:bg-[#91A079] text-white"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
                onClick={() => selectedBank && setShowCard(true)}
                disabled={!selectedBank}
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
      </main>

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

      {showSuccessCard && (
        <CardTransaksiBerhasil
          amount="25.000"
          orderNumber="1Y2HH6KYU"
          date="18 Desember 2024"
          userName="Masda Naswa"
          productCount={1}
          onClose={() => setShowSuccessCard(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Payment;
