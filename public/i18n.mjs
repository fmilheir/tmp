import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import LanguageSelector from "./languageSelector.mjs";
//import { DateTime } from "luxon";

const initializeI18n = () => {
	console.log("Initializing i18n");
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
				loadPath: "/locales/{{lng}}/translation.json",
			},
		});
};

const App = () => {
	// Initialize i18n when the component mounts
	React.useEffect(() => {
		initializeI18n();
	}, []);

	console.log("App component is mounting");

	return (
		<I18nextProvider i18n={i18n}>
			<div>
				<LanguageSelector />
				{/* Other components or content */}
			</div>
		</I18nextProvider>
	);
};

export default App;
