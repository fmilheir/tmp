import mysql from 'mysql2/promise';
import 'dotenv/config';  

// hiding the sensitive data
const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DB_DATABASE;

 // creating the pool! this enables to bypass the connection and disconnection of the database
const pool =  mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
});
  
export default pool;