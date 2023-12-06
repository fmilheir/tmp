import userModel from '../Models/userModel.mjs';
export const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    // If authenticated, call next()
    // If not, redirect to login 
    if (req.session.username) {
        return next();
    }
    //res.status(403).send({ msg: 'You are not authorized to view this page!' });
    res.redirect('/');
};

export const isAdmin = (req, res, next) => {
    if (req.session.username) {
        const userInstance = new userModel();

        userInstance.getUserByUsername(req.session.username).then((user) => {
            if (user.permission_level === 'admin') {
                return next();
            }
            //es.status(403).send({ msg: 'You are not authorized to view this page!' });
            res.redirect('/');
        });
    }
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
