const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    //1. Obtener el token de la cabecera.
    //El formato standar es "Bearer <token>".
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    //2. Si no hay token devolver un error.
    if (token === null) {
        return res
            .status(401)
            .json({ error: "Acceso no autorizado. Token no proporcionado" });
    }

    //3. Verificar el token.
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            //Si el token es invalido (ha expirado, está malformado, etc)
            return res
                .status(403)
                .json({ error: "Acceso denegado: Token invalido" });
        }

        // 4. Si el token es válido, guardamos el payload del token en el objeto req.
        // Esto permite que los siguientes middlewares o controladores de ruta
        // sepan quién es el usuario que hace la petición.
        req.user = user;

        // 5. Llamar a next() para pasar a la siguiente función en la cadena.
        next();
    });
};

module.exports = authMiddleware;