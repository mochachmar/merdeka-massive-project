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
      password VARCHAR(255),
      name VARCHAR(255) NOT NULL,
      googleId VARCHAR(255) UNIQUE,
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
      INSERT INTO Users (email, password, name, googleId, lastLogin, isVerified, resetPasswordToken, resetPasswordExpiresAt, verificationToken, verificationTokenExpiresAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      userData.email,
      userData.password || null,
      userData.name,
      userData.googleId || null,
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

  findByGoogleId: async (googleId) => {
    const query = `SELECT * FROM Users WHERE googleId = ?`;
    const [rows] = await db.execute(query, [googleId]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const query = `SELECT * FROM Users WHERE LOWER(email) = LOWER(?)`;
    const [rows] = await db.execute(query, [email.toLowerCase()]);
    return rows[0];
  },

  findById: async (id) => {
    const query = `SELECT * FROM Users WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  findOne: async (conditions) => {
    if (!conditions || Object.keys(conditions).length === 0) {
      throw new Error('No conditions provided for findOne query.');
    }

    let query = `SELECT * FROM Users WHERE `;
    const queryConditions = [];
    const values = [];

    if (conditions.resetPasswordToken) {
      queryConditions.push(`resetPasswordToken = ?`);
      values.push(conditions.resetPasswordToken);
    }

    if (conditions.resetPasswordExpiresAt) {
      queryConditions.push(`resetPasswordExpiresAt > ?`);
      values.push(new Date(conditions.resetPasswordExpiresAt)); // Convert to Date if necessary
    }

    if (conditions.verificationToken) {
      queryConditions.push(`verificationToken = ?`);
      values.push(conditions.verificationToken);
    }

    if (conditions.verificationTokenExpiresAt) {
      queryConditions.push(`verificationTokenExpiresAt > ?`);
      values.push(new Date(conditions.verificationTokenExpiresAt));
    }

    // Ensure conditions are present
    if (queryConditions.length === 0) {
      throw new Error('Invalid conditions provided for findOne query.');
    }

    query += queryConditions.join(' AND ');

    const [rows] = await db.execute(query, values);
    return rows[0]; // Return the first result or undefined if no match
  },

  update: async (id, updateData) => {
    const query = `
      UPDATE Users SET 
        email = ?, 
        password = ?, 
        name = ?, 
        googleId = ?, 
        lastLogin = ?, 
        isVerified = ?, 
        resetPasswordToken = ?, 
        resetPasswordExpiresAt = ?, 
        verificationToken = ?, 
        verificationTokenExpiresAt = ?
      WHERE id = ?
    `;
    const values = [
      updateData.email || null,
      updateData.password || null,
      updateData.name || null,
      updateData.googleId || null,
      updateData.lastLogin || new Date(),
      updateData.isVerified || false,
      updateData.resetPasswordToken || null,
      updateData.resetPasswordExpiresAt || null,
      updateData.verificationToken || null,
      updateData.verificationTokenExpiresAt || null,
      id,
    ];
    await db.execute(query, values);
  },

  delete: async (id) => {
    const query = `DELETE FROM Users WHERE id = ?`;
    await db.execute(query, [id]);
  },
};

// Initialize table
createUserTable();
