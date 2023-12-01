export const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    // If authenticated, call next()
    // If not, redirect to login 
    if (req.session.username) {
        return next();
    }
    res.status(403).send({ msg: 'You are not authorized to view this page!' });
    res.redirect('/');
};

export const isAdmin = (req, res, next) => {
    // Check if the user is an admin
    // If admin, call next()
    // If not, redirect to login
    if (req.user.permission_level === PERMISSION_LEVELS.ADMIN) {
        return next();
    }
    res.status(403).send({ msg: 'You are not authorized to view this page!' });
    res.redirect('/login');
};

export const sessionsAuth = (req, res, next) => {
    if (req.session.username) {
        return res.status(200).send({ msg: "Logged in already.", user: req.session.username });
    } else {
        req.session.username = {
            id: "user_object.id",
            name: "username",
            expiry: "expireTime"
        };
        next();
        return res.status(200).send({ msg: "Session created", user: req.session.username });
    }
}
