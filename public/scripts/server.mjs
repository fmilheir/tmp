import express from "express";
import cors from  'cors';
import UserRoute from '../../routes/userRoute.mjs';
import Poirouter from "../../routes/poiRoute.mjs";
import ImageRouter from "../../routes/imageRoute.mjs";
import path from 'path';
import session from 'express-session';
import pool from './pool.mjs';
import MySQLStore from 'express-mysql-session';
import bodyParser from "body-parser";


import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

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

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


    /////////////////////////////////changes//////////////////////////////

app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;

    // Set location data in a cookie
    res.cookie('locationCookie', JSON.stringify({ latitude, longitude }), {
        maxAge: 3600000, // 1 hour in milliseconds
        sameSite: true,
        secure: false, // Set to true if using https
        httpOnly: true,
    });

    res.json({ message: 'Location stored successfully.' });
});


    /////////////////////////////////changes//////////////////////////////


app.use('/user', UserRoute);
app.use('/poi', Poirouter);
app.use('/image', ImageRouter);
app.use(express.static("publid"));
app.use("/public", express.static('./public/'));


///// sswagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Endpoints testing',
            description: 'API Information',
            contact: {
                name: 'Developer'
            },
            licence: {
                name: 'Apache 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
            },
            servers: [
                {url: 'http://localhost:3000'}
            ]
        }
    },
    //apis: ['../../routes/*.js'] // files containing annotations as above#
    apis: ['routes/poiRoute.mjs', 'routes/userRoute.mjs', 'routes/imageRoute.mjs']
    
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get("/", (req, res) => {
    res.redirect( "/public/index.html");
});

app.get("/login", (req, res) => {
    res.redirect( "/public/login.html"); 
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

/*app.get("/reset-password", (req, res) => {
    const token = req.query.token;
    // Check if the token exists
    if (token) {
        // Constructing the directory name using import.meta.url
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        // Constructing the path to reset-password.html
        const filePath = path.join(__dirname, '..', '..', 'public', 'reset-password.html');
        res.sendFile(filePath, { query: { token } });
    } else {
        // If no token is provided, redirect to an error page or home page
        res.redirect('/error.html'); // To do 
    }
});*/

app.get('/reset-password', (req, res) => {
    // If there's a token, show the reset password form
    if (req.query.token) {
        res.sendFile(path.join(__dirname, 'public', 'reset-password.html'));
    } else {
        // If no token, redirect to error or some other page
        res.redirect('/error.html');
    }
});


app.get("/login", (req, res) => {
    res.redirect( "/public/login.html"); 
});

//app.get("/pois", (req, res) => {
 //   res.redirect("/public/pois.html");
//});

//app.get("/users", (req, res) => {
//    res.redirect("/public/users.html");
//});
app.get("/verificationcode", (req, res) => {
    const verificationCode = req.query.code;
    res.redirect(`/public/verificationcode.html?code=${verificationCode}`);
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});

/*app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: err.message || 'Something broke!' });

});
*/
export default app;