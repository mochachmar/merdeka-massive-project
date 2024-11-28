import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Card from '../components/Card.jsx';
import { Link, useParams } from 'react-router-dom';
import arrowBack from '../assets/arrow-back.svg';
import Author from '../assets/Author.svg';
import gambarSelada from '../assets/selada.png';
import gambarBayam from '../assets/bayam.png';
import gambarKale from '../assets/kale.png';
import gambarArigula from '../assets/arigula.png';
import gambarPakcoi from '../assets/pakcoi.png';
import gambarArtikel from '../assets/tomat.png';
import gambarCabai from '../assets/cabai.png';
import gambarTimun from '../assets/timun.png';
import gambarPaprika from '../assets/paprika.png';
import axios from 'axios';

// Artikel saat dibuka

function Article(props) {
  const { id } = useParams();

  const [article, setArticle] = useState();

  const [articlesList, setArticleList] = useState([]);

  const [formatedDate, setFormatedDate] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchDetail() {
      var response = await axios.get('http://localhost:3000/api/articles/' + id);
      setArticle(response.data);
      console.log(response.data);
      const date = new Date(response.data.publish_date);

      const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };

      const formattedDate = date.toLocaleDateString('id-ID', options);

      setFormatedDate(formattedDate);

      var response = await axios.get('http://localhost:3000/api/articles');
      setArticleList(response.data);
    }

    fetchDetail();
  }, [id]);

  if (!article) {
    return <p className="text-center text-red-500">Artikel tidak ditemukan.</p>;
  }

  const relatedArticles = articlesList.filter((item) => item.id !== parseInt(id)).slice(0, 3);

  return (
    <>
      <main className="w-full min-h-screen bg-gray-100">
        <Navbar />

        <section className="hero w-full mt-8 md:mt-8">
          <div className="flex items-center mb-2 px-4 md:px-16">
            <button onClick={() => window.history.back()} className="text-gray-700 hover:text-gray-900 flex items-center">
              <img src={arrowBack} alt="Kembali" className="mr-2" />
              <p className="font-medium text-xl">Kembali</p>
            </button>
          </div>

          <div className="text-center mb-8 px-4 md:px-16">
            <img src={'http://localhost:3000/uploads/' + article.thumbnail_image} alt={article.title} className="mx-auto rounded-lg shadow-lg w-full h-64 md:h-96 object-cover" />
            <h2 className="mt-4 text-3xl font-bold text-gray-800">{article.title}</h2>
          </div>

          <div className="flex justify-center items-center gap-x-2 mb-6 text-gray-600">
            <img src={Author} alt="Penulis" className="h-5 w-5" />
            <p>{article.created_by || 'Penulis Tidak Diketahui'}</p>
            <span>•</span>
            <p>{formatedDate}</p>
          </div>

          <div className="prose max-w-full text-gray-700 leading-relaxed text-lg p-6 md:p-16 bg-white shadow-md rounded-lg">{article.long_description}</div>

          <hr className="w-20 h-1 mx-auto my-10 bg-gray-300 border-0 rounded" />

          <h1 className="text-black text-center font-semibold text-3xl mb-8">Berita Lainnya</h1>

          <div className="flex justify-center gap-6 flex-wrap px-4 pb-10">
            {relatedArticles.map((relatedArticle) => (
              <CardDummy key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

function CardDummy({ article }) {
  // Format tanggal ke dalam bahasa Indonesia
  const formattedDate = new Date(article.publish_date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Link className="w-[346px] rounded-lg overflow-hidden shadow-lg border-2" key={article.id} to={`/article-login/${article.article_id}`}>
        <img src={`http://localhost:3000/uploads/${article.thumbnail_image}`} alt={article.title} className="w-full h-40 object-cover" />
        <div className="p-4 bg-white">
          <p className="text-gray-600 text-sm">{formattedDate || 'Tanggal tidak tersedia'}</p>
          <h2 className="font-bold text-lg text-gray-800">{article.title}</h2>
          <p className="text-gray-700 text-sm">{article.long_description}</p>
          {article.author && <p className="text-gray-600 text-sm mt-1">By {article.author}</p>}
        </div>
      </Link>
    </>
  );
}

export default Article;
