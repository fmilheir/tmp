import express from "express";
import cors from "cors";
import userRoute from "../../routes/userRoute.mjs";

import { Suspense } from "react";
//import { useTranslation } from "react-i18next";

const lngs = {
	en: { nativeName: "English" },
	de: { nativeName: "Deutsch" },
};

/*
function App() {
	const { t } = useTranslation();
	return (
		
	)
};

// here app catches the suspense from page in case translations are not yet loaded
export function WrappedApp() {
	return (
		<Suspense fallback="...is loading">
			<App />
		</Suspense>
	);
}*/

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.use(express.static("publid"));
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
