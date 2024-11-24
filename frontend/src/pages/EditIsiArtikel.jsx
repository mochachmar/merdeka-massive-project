import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../components/NavAdmin";
import FooterAdmin from "../components/FooterAdmin";
import Breadcrumbs from "../components/BreadCrumbs";
import axios from "axios";

function EditIsiArtikel() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State untuk menyimpan data form
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/articles/${id}`
        );
        const data = response.data;
        console.log(data)


        setTitle(data.title);
        setPublisher(data.created_by ?? "");

        const publishDate = new Date(data.publish_date);
        const formattedDate = `${publishDate.getFullYear()}-${(
          publishDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${publishDate
          .getDate()
          .toString()
          .padStart(2, "0")}`;
        setPublishDate(formattedDate);
        setContent(data.long_description);

        if (data.thumbnail_image) {
          setImageName(data.thumbnail_image);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [id]);

  // Fungsi untuk menangani perubahan input gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Simpan file untuk diunggah
      setImageName(file.name); // Tampilkan nama file
    }
  };

  // Fungsi untuk menghapus gambar yang telah diunggah
  const handleRemoveImage = () => {
    setImage(null);
    setImageName("");
  };

  // Fungsi untuk mengirim artikel sebagai draft atau publish
  const handleSubmit = async (status) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("short_description", subtitle);
      formData.append("long_description", content);
      formData.append("publish_date", publishDate);
      formData.append('created_by' , publisher)
      formData.append("status", status);
      if (image) {
        formData.append("thumbnail_image", image);
      }

      const response = await axios.put(
        `http://localhost:5000/api/articles/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Artikel berhasil diperbarui");
        navigate("/admin/articles");
      } else {
        alert("Gagal memperbarui artikel");
      }
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Terjadi kesalahan saat memperbarui artikel");
    }
  };

  return (
    <div className="full-width bg-gray-100 min-h-screen">
      <NavbarAdmin>
        <Breadcrumbs />
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Edit Isi Artikel
            </h2>

            {/* Input Judul Artikel */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block font-semibold mb-2 text-gray-700"
              >
                Judul Artikel
              </label>
              <input
                id="title"
                type="text"
                className="w-full p-2 border border-green-500 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Judul Artikel"
              />
            </div>

            {/* Input Penerbit */}
            <div className="mb-4">
              <label
                htmlFor="publisher"
                className="block font-semibold mb-2 text-gray-700"
              >
                Penerbit
              </label>
              <input
                id="publisher"
                type="text"
                className="w-full p-2 border border-green-500 rounded-md"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Penerbit Artikel"
              />
            </div>

            {/* Input Tanggal Terbit */}
            <div className="mb-4">
              <label
                htmlFor="publishDate"
                className="block font-semibold mb-2 text-gray-700"
              >
                Tanggal Terbit
              </label>
              <input
                id="publishDate"
                type="date"
                className="w-full p-2 border border-green-500 rounded-md"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </div>

            {/* Input Isi Artikel */}
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block font-semibold mb-2 text-gray-700"
              >
                Isi Artikel
              </label>
              <textarea
                id="content"
                className="w-full p-2 border border-green-500 rounded-md"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Isi Artikel"
              />
            </div>

            {/* Input Gambar */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">
                Gambar
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="flex items-center border border-green-500 text-green-500 px-4 py-2 rounded-md cursor-pointer"
                >
                  {imageName || "Choose File"}
                </label>
              </div>
              {image && (
                <div className="mt-4">
                  <p className="text-gray-700 mb-2">Pratinjau Gambar</p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Hapus Gambar
                  </button>
                </div>
              )}
            </div>

            {/* Tombol Submit */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => handleSubmit("Draft")}
                className="px-6 py-2 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300"
              >
                Draft
              </button>
              <button
                onClick={() => handleSubmit("Publik")}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Publik
              </button>
            </div>
          </div>
        </div>
      </NavbarAdmin>
      <FooterAdmin />
    </div>
  );
}

export default EditIsiArtikel;
