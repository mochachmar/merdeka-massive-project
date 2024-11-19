import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tanamanku_massive_project',
});

// Function to create User table
const createUserTable = async () => {
  const query = `
        CREATE TABLE IF NOT EXISTS Users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            lastLogin DATETIME DEFAULT CURRENT_TIMESTAMP,
            isVerified BOOLEAN DEFAULT FALSE,
            resetPasswordToken VARCHAR(255),
            resetPasswordExpiresAt DATETIME,
            verificationToken VARCHAR(255),
            verificationTokenExpiresAt DATETIME,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
  await db.execute(query);
};

// CRUD Functions
export const User = {
  create: async (userData) => {
    const query = `
            INSERT INTO Users (email, password, name, lastLogin, isVerified, resetPasswordToken, resetPasswordExpiresAt, verificationToken, verificationTokenExpiresAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const values = [
      userData.email,
      userData.password,
      userData.name,
      userData.lastLogin || new Date(),
      userData.isVerified || false,
      userData.resetPasswordToken || null,
      userData.resetPasswordExpiresAt || null,
      userData.verificationToken || null,
      userData.verificationTokenExpiresAt || null,
    ];
    const [result] = await db.execute(query, values);
    return result.insertId;
  },

  findById: async (id) => {
    const query = `SELECT * FROM Users WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const query = `SELECT * FROM Users WHERE LOWER(email) = LOWER(?)`; // Case insensitive query
    const [rows] = await db.execute(query, [email.toLowerCase()]); // Ensure the email is passed in lowercase
    return rows[0];
  },

  findOne: async (conditions) => {
    const verificationToken = conditions.verificationToken || null;
    const currentTime = conditions.currentTime || Date.now();

    const query = `
      SELECT * FROM Users 
      WHERE verificationToken = ? 
      AND verificationTokenExpiresAt > ?
    `;

    const [rows] = await db.execute(query, [verificationToken, currentTime]);
    return rows[0];
  },

  update: async (id, updateData) => {
    const fields = [];
    const values = [];
    for (const key in updateData) {
      fields.push(`${key} = ?`);
      values.push(updateData[key]);
    }
    values.push(id);

    const query = `UPDATE Users SET ${fields.join(', ')} WHERE id = ?`;
    await db.execute(query, values);
  },

  delete: async (id) => {
    const query = `DELETE FROM Users WHERE id = ?`;
    await db.execute(query, [id]);
  },
};

// Initialize table
createUserTable();
