import express from "express";
import 'dotenv/config';    
import chalk from 'chalk';   // for the green tick       
import serverCheck from "./public/scripts/serverCheck.mjs";

///// ROUTES /////
import userrouter from './routes/userRoute.mjs';
//////////////////////////

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.static("public"));
app.use("/public", express.static('./public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.redirect( "/public/index.html"); // redirect because of react , res render tends to break with babel
    }   
);


serverCheck(); // checking the connection before the server starts

////// ROUTES  //////
app.use('/users', userrouter);   
////// ROUTES  //////

app.listen( PORT, () => {
    console.log(
      `Example app listening at http://localhost:${PORT}`,
      chalk.green("✓")
    );
  });

