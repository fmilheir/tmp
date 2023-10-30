import app from './public/scripts/server.mjs'
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
    console.log("Connected!");
    }
);

const PORT = process.env.PORT;



app.listen( PORT, () => {
    console.log(
      `Example app listening at http://localhost:${PORT}`,
      chalk.green("✓")
    );
  });