// admin.model.js
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tanamanku_massive_project',
});

// CRUD Functions untuk AdminAccounts
export const Admin = {
  create: async (adminData) => {
    const query = `
      INSERT INTO AdminAccounts (email, username, password, created_by)
      VALUES (?, ?, ?, ?)
    `;
    const values = [adminData.email, adminData.username, adminData.password, adminData.created_by || null];
    const [result] = await db.execute(query, values);
    return result.insertId;
  },

  findByEmail: async (email) => {
    const query = `SELECT * FROM AdminAccounts WHERE LOWER(email) = LOWER(?)`;
    const [rows] = await db.execute(query, [email.toLowerCase()]);
    return rows[0];
  },

  findById: async (adminId) => {
    const query = `SELECT * FROM AdminAccounts WHERE admin_id = ?`;
    const [rows] = await db.execute(query, [adminId]);
    return rows[0];
  },

  update: async (adminId, updateData) => {
    const fields = [];
    const values = [];

    for (const key in updateData) {
      fields.push(`${key} = ?`);
      values.push(updateData[key]);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `UPDATE AdminAccounts SET ${fields.join(', ')} WHERE admin_id = ?`;
    values.push(adminId);

    const [result] = await db.execute(query, values);
    return result;
  },

  delete: async (adminId) => {
    const query = `DELETE FROM AdminAccounts WHERE admin_id = ?`;
    const [result] = await db.execute(query, [adminId]);
    return result;
  },

  // Tambahkan fungsi lain jika diperlukan
};
