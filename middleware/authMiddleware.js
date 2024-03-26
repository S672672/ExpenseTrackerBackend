// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, continue to the next middleware
    }
    res.status(401).send('Unauthorized'); // User is not authenticated, send 401 Unauthorized response
}

export default {
    ensureAuthenticated
};
