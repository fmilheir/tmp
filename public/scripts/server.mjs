import express from "express";
import cors from "cors";
import userRoute from "../../routes/userRoute.mjs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.use(express.static("public"));
app.use("/public", express.static("./public/"));

app.get("/", (req, res) => {
	res.redirect("/public/index.html"); // only this one works
});

app.get("/login", (req, res) => {
	res.redirect("/public/login.html");
});

app.use((req, res, next) => {
	res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

export default app;
