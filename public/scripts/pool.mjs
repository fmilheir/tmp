import mysql from 'mysql2/promise';
import 'dotenv/config'

// Create a connection pool

const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DATABASE;


const pool = mysql.createPool({
  host: HOST || 'mysql',
  user: USER || 'devops',
  password: PASSWORD || 'devops',
  database: DATABASE || 'devops',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;