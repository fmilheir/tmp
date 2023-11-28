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
      throw err;
    }
  };

  async addUser(username, email, hashedPassword, permission_level, verificationCode, verificationExpires) {
    console.log(`Add User in userModel - Verification Code: ${verificationCode}`);
    console.log(`AddUser: Username - ${username}`);
    try {
        const query = 'INSERT INTO users (username, email, password, permission_level, verificationCode, verificationExpires) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [username, email, hashedPassword, permission_level, verificationCode, verificationExpires]);
        
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

  async validateUserPassword(username, plainPassword) {
    try {
        const user = await this.getUserByUsername(username);
        if (!user) {
          console.log("User not found during password validation");
          return false;
        }
        console.log("Hashed password from DB:", user.password);
        console.log("Plain password for comparison:", plainPassword);
        const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
        console.log("Password validation:", isPasswordValid);
        return isPasswordValid;
    } catch (error) {
        console.error('Error during password validation:', error);
        throw new Error('An error occurred during password validation');
    }
  }



  async verifyUserEmail(email) {
    try {
      const query = 'UPDATE users SET isVerified = TRUE WHERE id = ?';
      const [result] = await pool.query(query, [email]);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  

  async getUserByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await pool.query(query, [email]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error('An error occurred during email verification');
    }
  }


  async savePasswordResetToken(userId, token, expires) {
    try {
        console.log(`Saving token for UserID: ${userId}, Token: ${token}, Expires: ${expires}`);
        const query = 'UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE id = ?';
        const [result] = await pool.query(query, [token, expires, userId]);
        console.log(`Token save result: Affected Rows - ${result.affectedRows}`);
        return result.affectedRows;
    } catch (error) {
        console.error('Error saving password reset token:', error);
        throw new Error('An error occurred during saving the password reset token');
    }
}


  async findUserByResetToken(token) {
    try {
      const query = 'SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpires > NOW()';
      const [results] = await pool.query(query, [token]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      throw new Error('An error occurred during finding the user by reset token');
    }
  }

  async updateUserPassword(userId, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'UPDATE users SET password = ? WHERE id = ?';
      const [result] = await pool.query(query, [hashedPassword, userId]);
      return result.affectedRows;
    } catch (error) {
      throw new Error('An error occured during password reset');
    }
  }



  async getUserByVerificationToken(token) {
    try {
      const query = 'SELECT * FROM users WHERE verificationToken = ? AND verificationExpires > NOW()';
      const [rows] = await pool.query(query, [token]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error('An error occured during password reset');
    }
  }

  async updateUserAsVerified(verificationCode) {
    try {
        const query = 'UPDATE users SET isVerified = TRUE WHERE verificationCode = ?';
        console.log("Executing Query:", query, "with verificationCode:", verificationCode);
        const [result] = await pool.query(query, [verificationCode]);
        console.log("Query Result:", result);
        return result.affectedRows; 
    } catch (error) {
        console.error('Error in updateUserAsVerified:', error);
        throw new Error('An error occurred while updating user verification status');
    }
  }


  async getUserByVerificationCode(verificationCode) {
    try {
      const query = 'SELECT * FROM users WHERE verificationCode = ?';
      const [rows] = await pool.query(query, [verificationCode]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error getting user by verification code:",error);
      throw new Error('An error occurred while retrieving user by verification code');
    }
  }
  
  // write any database queries here withing a function! make sure it is async!!!


}export default userModel;