exports.checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access forbidden: insufficient privileges' });
        }
        next();
    };
};


exports.trainerRole = (req, res, next) => {
    console.log("req.user:",req.user);
    if (req.user && req.user.role == 1) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, not a trainer' });
    }
};


exports.clientRole = (req, res, next) => {
    if (req.user && req.user.role == 2) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, not a client' });
    }
};