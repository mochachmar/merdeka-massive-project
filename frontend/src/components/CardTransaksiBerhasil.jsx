import React from "react";

const CardTransaksiBerhasil = ({
  amount,
  orderNumber,
  date,
  userName,
  productCount,
  onClose, // Tambahkan properti onClose
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/3 p-6 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-6">Transaksi Berhasil</h2>
          <div className="mt-2 flex justify-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-lg font-semibold mb-6">Rp. {amount}</div>
        <button className="text-blue-500 underline mb-10">Cetak Resi</button>
        <div className="text-left">
          <p className="mb-3">
            <strong>Pesanan:</strong> {userName}
          </p>
          <p className="mb-3">
            <strong>Jumlah Produk:</strong> {productCount}
          </p>
          <p className="mb-3">
            <strong>Nomor Pesanan:</strong> {orderNumber}
          </p>
          <p className="mb-3">
            <strong>Tanggal Pemesanan:</strong> {date}
          </p>
        </div>
        <button
          className="mt-6 w-60 bg-[#6D7E5E] hover:bg-[#91A079] text-white font-bold py-2 px-4 rounded"
          onClick={onClose} // Panggil fungsi onClose
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default CardTransaksiBerhasil;
