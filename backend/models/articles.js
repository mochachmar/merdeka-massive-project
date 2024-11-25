import { db } from '../config/db.js';

const getAllArticles = async () => {
  const [rows] = await db.query('SELECT * FROM articles');
  return rows;
};

const getArticleById = async (id) => {
  const [rows] = await db.query('SELECT * FROM articles WHERE article_id = ?', [id]);
  return rows[0];
};

const createArticle = async (article) => {
  const { title, thumbnail_image, short_description, long_description, publish_date, status, created_by } = article;
  const [result] = await db.query(
    'INSERT INTO articles (title, thumbnail_image, short_description, long_description, publish_date, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, thumbnail_image, short_description, long_description, publish_date, status, created_by]
  );
  return result.insertId;
};

const updateArticle = async (id, article) => {
  const { title, thumbnail_image, short_description, long_description, publish_date, status, created_by } = article;
  const [result] = await db.query(
    'UPDATE articles SET title = ?, thumbnail_image = ?, short_description = ?, long_description = ?, publish_date = ?, status = ?, created_by = ? WHERE article_id = ?',
    [title, thumbnail_image, short_description, long_description, publish_date, status, created_by, id]
  );
  return result.affectedRows > 0;
};

const deleteArticle = async (id) => {
  const [result] = await db.query('DELETE FROM articles WHERE article_id = ?', [id]);
  return result.affectedRows > 0;
};

export { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle };
