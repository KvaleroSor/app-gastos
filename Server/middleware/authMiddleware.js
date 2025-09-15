console.log("--- AUTH MIDDLEWARE FILE LOADED ---");

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({
                error: "Acceso no autorizado. Token no proporcionado o con formato incorrecto.",
            });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        return res
            .status(403)
            .json({ error: "Acceso denegado: Token inválido." });
    }
};

module.exports = authMiddleware;
