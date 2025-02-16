const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.role || req.role !== requiredRole) {
            return res.status(403).json({ message: "Insufficient privileges" });
        }
        next();
    };
};

module.exports = verifyRole;
