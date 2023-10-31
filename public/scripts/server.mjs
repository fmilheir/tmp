import express from "express";

const app = express();

app.use(express.static("publid"));
app.use("/public", express.static('./public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect( "/public/index.html"); // only this one works 
});

export default app;