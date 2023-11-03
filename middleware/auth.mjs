export const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    // If authenticated, call next()
    // If not, redirect to login 
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); 
};

export const isAdmin = (req, res, next) => {
    // Check if the user is an admin
    // If admin, call next()
    // If not, redirect to login
    if (req.user.permission_level === PERMISSION_LEVELS.ADMIN) {
        return next();
    }
    res.redirect('/login');
};