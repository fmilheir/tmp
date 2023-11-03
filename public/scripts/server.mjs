import express from "express";
import cors from  'cors';
import userRoute from '../../routes/userRoute.mjs'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoute);
app.use(express.static("publid"));
app.use("/public", express.static('./public/'));



app.get("/", (req, res) => {
    res.redirect( "/public/index.html"); // only this one works 
});

export default app;