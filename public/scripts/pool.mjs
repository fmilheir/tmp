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

/*
// Configuration for the database connection
const dbConfig = {
  host: 'mysql',
  user: 'devops',
  password: 'devops',
  database: 'devops',
};

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Function to handle database operations
function performDatabaseOperations() {
  // Connect to the database
  connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    // Query to retrieve table names
    const showTablesQuery = 'SHOW TABLES';

    // Execute the query to retrieve table names
    connection.query(showTablesQuery, function (err, results) {
      if (err) throw err;

      console.log('Existing tables in the database:');
      results.forEach((row) => {
        console.log(row[`Tables_in_${connection.config.database}`]);
      });

      // Create the "users" table
      createUsersTable();
    });
  });
}

// Function to create the "users" table
function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

  // Execute the query to create the "users" table
  connection.query(createTableQuery, function (err) {
    if (err) throw err;
    console.log('Table "users" created successfully.');

    // Insert data into the "users" table
    insertUserData();
  });
}

// Function to insert data into the "users" table
function insertUserData() {
  const insertQuery = `
    INSERT INTO users (username, email, password)
    VALUES
      ('user1', 'user1@example.com', 'password1'),
      ('user2', 'user2@example.com', 'password2'),
      ('user3', 'user3@example.com', 'password3')
  `;

  // Execute the query to insert entries into the "users" table
  connection.query(insertQuery, function (err, result) {
    if (err) throw err;
    console.log('Inserted ' + result.affectedRows + ' rows into the "users" table.');

    // Retrieve data from the "users" table
    retrieveUserData();
  });
}

// Function to retrieve data from the "users" table
function retrieveUserData() {
  const selectQuery = 'SELECT * FROM users';

  // Execute the query to select entries from the "users" table
  connection.query(selectQuery, function (err, rows) {
    if (err) throw err;

    // Log the retrieved entries
    console.log('Retrieved entries from the "users" table:');
    rows.forEach((row) => {
      console.log('ID: ' + row.id);
      console.log('Username: ' + row.username);
      console.log('Email: ' + row.email);
      console.log('Password: ' + row.password);
      console.log('------------------------');
    });

    // Close the database connection
    connection.end();
  });
}

// Call the function to start performing database operations
performDatabaseOperations();
*/