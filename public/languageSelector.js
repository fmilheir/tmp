import React from "react";
import { useTranslation } from "react-i18next";

export function LanguageSelector() {
	const { i18n } = useTranslation();

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<div>
			<label>Select Language:</label>
			<select
				onChange={(e) => changeLanguage(e.target.value)}
				value={i18n.language}
			>
				<option value="ar">Arabic</option>
				<option value="en">English</option>
				<option value="de">German</option>
				<option value="fr">French</option>
				<option value="hu">Hungarian</option>
				<option value="es">Spanish</option>
				<option value="pt">Portuguese</option>
				<option value="pl">Polish</option>
			</select>
		</div>
	);
}

export default LanguageSelector;
