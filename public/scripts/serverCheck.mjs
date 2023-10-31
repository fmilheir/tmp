import chalk from 'chalk';   // for the green tick  
import pool from './pool.mjs';


async function startConection() {
    try {
      const connection = await pool.getConnection();
      console.log('Connected!');
      chalk.green("✓")

      const [rows] = await connection.query('SHOW TABLES LIKE "users"');

    if (rows.length === 0) {
      // If the "users" table doesn't exist, create it
      await connection.query(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          permission_level ENUM('admin', 'customer', 'external') NOT NULL
        )
      `);
      console.log('The "users" table has been created.');
    } else {
      console.log('The "users" table already exists.');
    }

    const [row] = await connection.query('SHOW TABLES LIKE "point_of_interest"');

    if (rows.length === 0) 
    {
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
  console.log('Table "point_of_interest" created.');
    }
    else
    {
        console.log('The "point_of_interest" table already exists.');
    }
  

    
  
      // Use the connection to query the database
      //const [rows, fields] = await connection.query('SELECT * FROM your_table');
  
      connection.release(); // Release the connection back to the pool
  
      console.log(rows);
    } catch (error) {
      console.error(error);
    }
  }
  export default startConection;