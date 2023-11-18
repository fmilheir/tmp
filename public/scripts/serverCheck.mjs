import chalk from 'chalk';   // for the green tick  
import pool from './pool.mjs';

async function startConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected!');
    chalk.green("✓");

    // Create "users" table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        permission_level ENUM('admin', 'user', 'guest') NOT NULL,
        resetPasswordToken VARCHAR(255) DEFAULT NULL,
        resetPasswordExpires DATETIME DEFAULT NULL,
        verificationCode VARCHAR(6) DEFAULT NULL,
        verificationExpires DATETIME DEFAULT NULL,
        isVerified BOOLEAN DEFAULT FALSE
      )
    `);
    console.log('Checked "users" table.');

    // Create "point_of_interest" table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS point_of_interest (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50),
        country VARCHAR(100),
        region VARCHAR(100),
        lon DECIMAL(10, 6),
        lat DECIMAL(10, 6),
        description TEXT,
        recommendations TEXT
      )
    `);
    console.log('Checked "point_of_interest" table.');

    connection.release(); // Release the connection back to the pool

  } catch (error) {
    console.error(error);
  }
}

export default startConnection;
