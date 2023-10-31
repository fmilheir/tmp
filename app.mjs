import express, { query } from "express";
import 'dotenv/config';    
import chalk from 'chalk';   // for the green tick    
import startConection from './public/scripts/serverCheck.mjs';
import app from './public/scripts/server.mjs';

startConection();


//////////////////////////
const PORT = process.env.PORT;

  

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