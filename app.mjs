import express from "express";
import 'dotenv/config';    
import chalk from 'chalk';   // for the green tick       
import mysql from 'mysql'



let connection = mysql.createConnection({
    host: 'mysql',
    user: 'devops',
    password: 'devops',
    database: 'devops'
    });


    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connected!');
      
        // Query to retrieve table names
        const showTablesQuery = 'SHOW TABLES';
      
        // Execute the query to retrieve table names
        connection.query(showTablesQuery, function(err, results) {
          if (err) throw err;
          
          console.log('Existing tables in the database:');
          results.forEach(row => {
            console.log(row[`Tables_in_${connection.config.database}`]);
          });
      
          // SQL query to create the "users" table
          const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              username VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL,
              password VARCHAR(255) NOT NULL
            )
          `;
      
          // Execute the query to create the "users" table
          connection.query(createTableQuery, function(err) {
            if (err) throw err;
            console.log('Table "users" created successfully.');
      
            // SQL query to insert entries into the "users" table
            const insertQuery = `
              INSERT INTO users (username, email, password)
              VALUES
                ('user1', 'user1@example.com', 'password1'),
                ('user2', 'user2@example.com', 'password2'),
                ('user3', 'user3@example.com', 'password3')
            `;
      
            // Execute the query to insert entries into the "users" table
            connection.query(insertQuery, function(err, result) {
              if (err) throw err;
              console.log('Inserted ' + result.affectedRows + ' rows into the "users" table.');
      
              // SQL query to retrieve entries from the "users" table
              const selectQuery = 'SELECT * FROM users';
      
              // Execute the query to select entries from the "users" table
              connection.query(selectQuery, function(err, rows) {
                if (err) throw err;
      
                // Log the retrieved entries
                console.log('Retrieved entries from the "users" table:');
                rows.forEach(row => {
                  console.log('ID: ' + row.id);
                  console.log('Username: ' + row.username);
                  console.log('Email: ' + row.email);
                  console.log('Password: ' + row.password);
                  console.log('------------------------');
                });
      
                // Close the connection
                connection.end();
              });
            });
          });
        });
      });
 


//////////////////////////

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.static("public"));
app.use("/public", express.static('./public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());















app.get("/", (req, res) => {
    res.redirect( "/public/index.html"); // only this one works 
    }   
);


app.listen( PORT, () => {
    console.log(
      `Example app listening at http://localhost:${PORT}`,
      chalk.green("✓")
    );
  });