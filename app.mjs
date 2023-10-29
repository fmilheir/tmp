import express, { query } from "express";
import 'dotenv/config';    
import chalk from 'chalk';   // for the green tick    
import startConection from './public/scripts/conection.mjs';
startConection();


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