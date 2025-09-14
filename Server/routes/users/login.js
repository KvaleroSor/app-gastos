const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route GET /users/profile
 * @description Obtiene los datos del perfil del usuario autenticado.
 * @access Private
 */
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    console.log(`Email encontrado --> ${email}`);

    try {
        //Buscamos en la bbdd si hay algún email igual.
        const resultQuery = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        //Comprobamos si ha encontrado coincidencias con el email o no.
        if (resultQuery.rows.length === 0) {
            return res
                .status(400)
                .json({ error: "Credenciales invalidas! - EMAIL INCORRECTO!" });
        }
        //Guardamos el usuario si ha encontrado coincidencias.
        const user = resultQuery.rows[0];

        // DEBUG: Imprimir el objeto de usuario completo para inspeccionarlo
        console.log("User object from database:", user);

        //Comprobamos la contraseña de el usuario que ha encontrado por la coincidencia del email.
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res
                .status(400)
                .json({
                    error: "Credenciales invalidas! - PASSWORD INCORRECTO!",
                });
        }

        //Generamos el payload para el token.
        const payload = {
            userId: user.id,
            role: user.role,
        };

        //Firmamos el token.
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "90d" },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error del servidor");
    }
});

module.exports = router;
