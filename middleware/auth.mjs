export const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    // If authenticated, call next()
    // If not, redirect to login 
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
    
};