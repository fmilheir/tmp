import pool from '../public/scripts/pool.mjs';
import { PERMISSION_LEVELS }  from '../public/scripts/permissions.mjs';
import bcrypt from 'bcryptjs';

class userModel{

  getAllUsers = async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    } catch (err) {
      console.error(err);
    }
  };

  async addUser(username, email, hashedPassword, permission_level) {
    console.log(`AddUser: Username - ${username}`);
    try {
        const query = 'INSERT INTO users (username, email, password, permission_level) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [username, email, hashedPassword, permission_level]);
        
        return result.insertId;
    } catch (err) {
        console.error("Error in addUser:", err);
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
      // console.log(pool);
      const [rows] = await pool.query(query, [username]);
      return rows.length > 0 ? rows[0]: null;
    } catch (error) {
      throw error;
    }
  }

  async validateUserPassword(username, password){
    try{
      const user = await this.getUserByUsername(username);
      if (!user) return false;
      console.log("Hashed password from DB:", user.password);
      console.log("Plain password for comparison:", password);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      return isPasswordValid;
    } catch (error) {
      // Handle the error 
      throw new Error('An error occurred during password validation');
    }
  }
  // write any database queries here withing a function! make sure it is async!!!


}export default userModel;