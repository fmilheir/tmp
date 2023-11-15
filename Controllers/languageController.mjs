module.exports.getLanguage = (req, res) => {
    res.json({ message: req.t('WelcomeMessage') });
}