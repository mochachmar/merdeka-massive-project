import React from "react";

const CardPayment = ({ email, onChangeEmail, onSubmit, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Detail Pengiriman</h2>

        {/* Email */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-1">Alamat Email:</p>
          <p className="text-gray-800">{email}</p>
        </div>

        {/* Virtual Account */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-1">Virtual Account:</p>
          <p className="text-gray-800">BNI</p>
        </div>

        {/* No Virtual Account */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-1">No Virtual Account:</p>
          <p className="text-gray-800">3312301018</p>
        </div>

        {/* Upload Bukti Pembayaran */}
        <div className="mb-4">
          <label
            htmlFor="bukti-pembayaran"
            className="block text-sm text-gray-700 mb-1"
          >
            Masukkan Bukti Pembayaran
          </label>
          <input
            type="file"
            id="bukti-pembayaran"
            className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
          />
        </div>

        {/* Total Dibayar */}
        <div className="mb-6">
          <p className="text-sm text-gray-700">Total Dibayar:</p>
          <p className="text-gray-800 font-semibold">Rp 25.000</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            className="w-1/2 mr-2 text-gray-600 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="w-1/2 ml-2 bg-[#6D7E5E] text-white py-2 rounded-md hover:bg-[#91A079] transition"
            onClick={onSubmit}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
