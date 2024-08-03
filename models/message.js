const db = require('../config/database');

const Message = {
  create: async (messageData) => {
    const { title, text, userId } = messageData;
    const query = `
      INSERT INTO messages (title, text, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await db.query(query, [title, text, userId]);
    return result.rows[0];
  },

  getAll: async () => {
    const query = `
      SELECT m.*, u.first_name, u.last_name, u.is_member
      FROM messages m
      JOIN users u ON m.user_id = u.id
      ORDER BY m.created_at DESC
    `;
    const result = await db.query(query);
    return result.rows;
  },

  delete: async (messageId) => {
    const query = 'DELETE FROM messages WHERE id = $1';
    await db.query(query, [messageId]);
  },
};

module.exports = Message;