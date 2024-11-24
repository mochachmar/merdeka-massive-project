import { Link } from "react-router-dom";

function Card({ article }) {
  // Format tanggal ke dalam bahasa Indonesia
  const formattedDate = new Date(article.publish_date).toLocaleDateString(
    "id-ID",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <>
      <Link
        className="w-[346px] rounded-lg overflow-hidden shadow-lg border-2"
        key={article.id}
        to={`/article-login/${article.article_id}`}
      >
        <img
          src={`http://localhost:5000/uploads/${article.thumbnail_image}`}
          alt={article.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4 bg-white">
          <p className="text-gray-600 text-sm">
            {formattedDate || "Tanggal tidak tersedia"}
          </p>
          <h2 className="font-bold text-lg text-gray-800">{article.title}</h2>
          <p className="text-gray-700 text-sm">{article.long_description}</p>
          {article.author && (
            <p className="text-gray-600 text-sm mt-1">By {article.author}</p>
          )}
        </div>
      </Link>
    </>
  );
}

export default Card;
