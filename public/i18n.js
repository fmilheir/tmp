import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
//import { DateTime } from "luxon";

i18n
	// i18next-http-backend
	// loads translations from the server
	.use(Backend)
	// detect user language
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	.init({
		debug: true,
		fallbackLng: "en",
		backend: {
			loadPath: "/locales/{{lng}}/translation.json", // load language file
		},
	});

return (
	<div>
		<LanguageSelector />
	</div>
);

export default i18n;
