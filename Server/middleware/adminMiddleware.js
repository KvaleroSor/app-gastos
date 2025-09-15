const adminMiddleware = (req, res, next) => {
    // Este middleware asume que authMiddleware ya se ha ejecutado
    // y que req.user contiene el payload del token.

    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado: Se requiere rol de administrador.' });
    }

    next();
};

module.exports = adminMiddleware;
