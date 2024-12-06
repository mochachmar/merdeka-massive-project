import { Link } from 'react-router-dom';

function Card({ article }) {
  // Format tanggal ke dalam bahasa Indonesia
  const formattedDate = new Date(article.publish_date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      className="w-[346px] rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105 duration-300"
      key={article.id}
      to={`/article/${article.article_id}`}
      style={{
        backgroundImage: `url(http://localhost:3000/uploads/${article.thumbnail_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Empty Space */}
      <div className="h-40"></div>

      {/* Text Overlay Container with Backdrop Opacity */}
      <div className="bg-[#C4C8AD] bg-opacity-70 p-6 rounded-lg">
        <p className="text-gray-900 text-sm">{formattedDate || 'Tanggal tidak tersedia'}</p>
        <h2 className="font-bold text-lg text-gray-950">{article.title}</h2>
        <p className="text-gray-950 text-sm">{article.short_description}</p>
        {article.author && <p className="text-gray-800 text-sm mt-1">By {article.author}</p>}
      </div>
    </Link>
  );
}

export default Card;
