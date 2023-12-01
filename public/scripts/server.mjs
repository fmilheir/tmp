import express from "express";
import cors from  'cors';
import UserRoute from '../../routes/userRoute.mjs';
import Poirouter from "../../routes/poiRoute.mjs";
import path from 'path';
import session from 'express-session';
import pool from './pool.mjs';
import MySQLStore from 'express-mysql-session';
import { fileURLToPath } from "url";
import * as jwtUtils from '../../middleware/jwtUtils.mjs';
import { DateTime } from "luxon";


const __dirname = path.resolve();

const app = express();

const sessionStore = new (MySQLStore(session))({
    clearExpired: true,
    expiration: 86400000,
    checkExpirationInterval: 3600000,
    createDatabaseTable: true,
      }, 
    pool);
// Initialize the session
app.use(session({
    name: 'session_name',
    secret: 'developer',
    resave: false,
    saveUninitialized: true,
    store: sessionStore, // Use a store to store session data 
    cookie: { 
        maxAge: 3600000, // 1 hour in milliseconds
        sameSite: true,
        secure: false, // Set to true if using https
        httpOnly: true,
    },
    credentials: true, // Allows credentials (cookies) to be sent with cross-origin requests
}));


app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', UserRoute);
app.use('/poi', Poirouter);
app.use("/public", express.static('./public/'));

// Set up the session store



// Use JWT-related function from jwtUtils
const token = jwtUtils.signToken({ username: 'guest' }, { expiresIn: '1h' });
const decoded = jwtUtils.verifyToken(token);
const encryptedToken = jwtUtils.encryptToken({ username: 'guest' }, { expiresIn: '1h'});
const decrypted = jwtUtils.decryptToken(encryptedToken);

app.get("/", (req, res) => {
    res.redirect( "/public/index.html");
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


app.get('/reset-password', (req, res) => {
    // If there's a token, show the reset password form
    if (req.query.token) {
        res.sendFile(path.join(__dirname, 'public', 'reset-password.html'));
    } else {
        // If no token, redirect to error or some other page
        res.redirect('/error.html');
    }
});



app.get("/verificationcode", (req, res) => {
    const verificationCode = req.query.code;
    res.redirect(`/public/verificationcode.html?code=${verificationCode}`);
});

app.use((req, res, next) => {
    if (!req.session) {
      req.session = new session({
        name: 'session_name',
        secret: 'developer',
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
          maxAge: 3600000, // 1 hour in milliseconds
          sameSite: true,
          secure: false, // Set to true if your using https
          httpOnly: true,
        },
        credentials: true, // Allows credentials (cookies) to be sent with cross-origin requests
      });
    }
    next();
  });

app.use((req, res, next) => {
    if (req.session) {
        let expiry = DateTime.now().plus({ hours: 1 }).toISO();
        req.session.expiry = expiry;
        next();
    }else {
        res.status(403).send({ msg: "You must be logged in to access this resources"})
    }
    
});

app.get("/login", (req, res) => {
    res.redirect( "/public/login.html"); 
});

app.get("/pois", (req, res) =>{
    res.redirect("/public/pois.html");
});

app.get("/users", (req, res) =>{
    res.redirect("/public/users.html");
});
// Handling the 404 error
app.use((req, res, next) => {
    res.status(404).send("Sorry I can't find that");
})


// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: err.message || 'Something broke!' });

});

export default app;