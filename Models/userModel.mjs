import pool from '../public/scripts/pool.mjs';

class user{

    getAllUsers = async (req, res) => {
        try {
          const [rows] = await pool.query('SELECT * FROM users');
            return rows;
        } catch (err) {
          console.error(err);
        }
    };

    async addUser(username, password, permission_level) {
        try {
          const query = 'INSERT INTO users (username, password, permission_level) VALUES (?, ?, ?)';
          const [result] = await pool.query(query, [username, password, permission_level]);
          return result.insertId;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }

      async deleteUser(userId) {
        try {
          const query = 'DELETE FROM users WHERE id = ?';
          const [result] = await pool.query(query, [userId]);
          return result.affectedRows;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }

    async getUserByUsername(username) {
      try {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await pool.query(query, [username]);
        return rows[0];
      } catch (error) {
        throw error;
      }
    }
    // write any database queries here withing a function! make sure it is async!!!

}export default user;