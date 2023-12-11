import userModel from '../Models/userModel.mjs';
export const isAuthenticated = (req, res, next) => {
    if (req.session.username) {
        return next();
    }
    res.status(403).send({ msg: 'You are not authorized to view this page!' });
};
export const isAdmin = (req, res, next) => {
    if (req.session.username) {
        const userInstance = new userModel();
        userInstance.getUserByUsername(req.session.username).then((user) => {
            if (user && user.permission_level === 'admin') {
                return next();
            } else {
                return res.status(403).send({ msg: 'You are not authorized to view this page!' });
            }
        }).catch((error) => {
            return res.status(500).send({ msg: 'Internal server error' });
        });
    } else {
        return res.status(403).send({ msg: 'You are not authorized to view this page!' });
    }
};
export const sessionsAuth = (req, res, next) => {
    if (req.session.username) {
        return next();
    } else {
        req.session.username = {
            id: "user_object.id",
            name: "username",
            expiry: "expireTime"
        };
        return next();
    }
};
