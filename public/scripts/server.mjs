import express from "express";
import cors from  'cors';
import userRoute from '../../routes/userRoute.mjs';
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.resolve();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoute);
app.use("/public", express.static('./public/'));


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



app.get("/verificationcode", (req, res) => {
    const verificationCode = req.query.code;
    res.redirect(`/public/verificationcode.html?code=${verificationCode}`);
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: err.message || 'Something broke!' });

});

export default app;