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
    console.log("Connected!");
    }
);

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