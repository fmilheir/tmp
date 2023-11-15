module.exports = (req, res, next) => {
    const userLanguage = req.header('Accept-Language');
    if (userLanguage) {
        req.i18n.changeLanguage(userLanguage);
    }
    next();
}