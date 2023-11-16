import express from "express";
import cors from  'cors';
import userRoute from '../../routes/userRoute.mjs';
import path from 'path';
import { fileURLToPath } from "url";
import session from 'express-session';
import startSession from './session.mjs';
import bodyParser from 'body-parser';
//import i18next from "i18next";ee
//import setLanguage from "../../middleware/setLanguage.mjs";


// ... (your imports)

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static('./public/'));

// Configure the MySQL session store
const sessionStore = startSession.startSession;

// Define the session middleware for specific routes
app.use('/user/login', session({
  secret: 'Mysupersecret',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  unset: 'destroy',
  proxy: true,
  cookie: {
    maxAge: 600000,
    httpOnly: false,
  },
}));

// Define a middleware to check if a user is authenticated
app.use((req, res, next) => {
  if (req.path === "/public/login" || req.path === "/login" || req.path === "/user/login") {
    // Allow access to public pages and login-related routes
    console.log("Public page");
    next();
  } else if (req.session && req.session.username) {
    // The user is logged in, and you can access req.session.username
    console.log("Authenticated");
    console.log(`Logged in as: ${req.session.username}`);
    next();
  } else {
    // The user is not logged in or accessing a protected page
    console.log("Forbidden");
    return res.status(401).json({ error: "You're not logged in. Go away!" });
  }
});

app.use('/user', userRoute);
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.redirect( "/public/index.html");
});

app.post("/login", (req, res) => {
    // Set the 'username' in the session
    req.session.username = req.body.username;
    console.log(`this is my usernadasdaame: ${req.session.username}`);
    res.redirect("/public/login.html");
  });

app.get("/verify", (req, res) =>{
    res.redirect("/public/verify.html");
});

app.get("/signup", (req, res) => {
    res.redirect("/public/signup.html");
});

app.get("/verifyEmail", (req, res) => {
    res.redirect("/public/verifyEmail.html");
});

app.get("/reset-password", (req, res) => {
    const token = req.query.token;
    // Check if the token exists
    if (token) {
        // Construct the directory name using import.meta.url
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        // Construct the path to reset-password.html
        const filePath = path.join(__dirname, '..', '..', 'public', 'reset-password.html');
        res.sendFile(filePath, { query: { token } });
    } else {
        // If no token is provided, redirect to an error page or home page
        res.redirect('/error.html'); // Assuming you have an error.html or similar
    }
});

app.get("/verificationcode", (req, res) => {
    const verificationCode = req.query.code;
    res.redirect(`/public/verificationcode.html?code=${verificationCode}`);
});


app.get("/welcome", (req, res) => {
    res.redirect("/public/welcome.html");
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: err.message || 'Something broke!' });

});


export default app;