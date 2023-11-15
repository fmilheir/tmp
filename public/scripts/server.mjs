import express from "express";
import cors from  'cors';
import userRoute from '../../routes/userRoute';
import path from 'path';
import { fileURLToPath } from "url";
//import i18next from "i18next";
//import setLanguage from "../../middleware/setLanguage.mjs";


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*app.use(i18n.middleware.handle(i18next));
app.use(setLanguage);*/
app.use('/user', userRoute);
//app.use(express.static("publid"));
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

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: err.message || 'Something broke!' });

});

export default app;