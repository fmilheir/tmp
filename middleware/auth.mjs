import userModel from '../Models/userModel.mjs';
export const isAuthenticated = (req, res, next) => {
    if (req.session.username) {
        return next();
    }
    res.status(403).send({ msg: 'You are not authorized to view this page!' });
};

export const isAdmin = async (req, res, next) => {
    if (req.session.username) {
        try {
            const userInstance = new userModel();
            const user = await userInstance.getUserByUsername(req.session.username);
            if (user.permission_level === 'admin') {
                return next();
            } else {
                return res.status(403).send({ msg: 'You are not authorized to view this page!' });
            }
        } catch (error) {
            return res.status(500).send({ msg: 'Internal server error' });
        }
    } else {
        return res.status(403).send({ msg: 'You are not authorized to view this page!' });
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
