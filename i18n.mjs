import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import I18middleware from 'i18next-express-middleware';

i18next
    .use(I18NextHttpBackend)
    .use(I18middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        preload: ['en', 'de', 'es', 'ar', 'hu', 'pl', 'pt'],
        backend: {
            loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json'
        },
        dectection: {
            // Order and where from the user language should be detected
            order: ['querystring', 'cookie', 'header'],
            caches: ['cookie']
        },
});
export default i18next;