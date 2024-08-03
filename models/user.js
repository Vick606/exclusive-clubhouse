const db = require('../config/database');
const bcrypt = require('bcrypt');

const User = {
  create: async (userData) => {
    const { firstName, lastName, email, password, isAdmin } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (first_name, last_name, email, password, is_member, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [firstName, lastName, email, hashedPassword, false, isAdmin];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  },

  updateMemberStatus: async (userId, isMember) => {
    const query = 'UPDATE users SET is_member = $1 WHERE id = $2 RETURNING *';
    const result = await db.query(query, [isMember, userId]);
    return result.rows[0];
  },
};

module.exports = User;