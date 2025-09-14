/**
 * @file /routes/users/get_all_users.js
 * @description Consulta que devuelve todos los usuarios de la BBDD
 *
 * Esta consulta es la encargada de devolvernos todos los elementos que contenga
 * la tabla "users", para el tratamiento de sus datos arreglo nuestras necesidades.
 *
 */

const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
    const user_rool = req.user.role;    
    let result; 

    try {
        if(user_rool === 'admin'){
            result = await pool.query("SELECT * FROM users");
        }else{
            return res.status(403).json({error: "No tiene permisos para mostrar los usuarios"});
        }

        if (result.rowCount === 0) {
            return res
                .status(404)
                .json({ mensaje: "No se han encontrado usuarios!" });
        }
        res.status(200).json({
            mensaje: "Usuarios encontrados!",
            data: result.rows,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("Error al obtener usuarios ❌");
    }
});

module.exports = router;
