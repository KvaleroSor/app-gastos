/**
 * @file /routes/properties/get_all_properties.js
 * @description Consulta que devuelve todos las propiedades de la BBDD
 *
 * Esta consulta es la encargada de devolvernos todos los elementos que contenga
 * la tabla "properties", para el tratamiento de sus datos arreglo nuestras necesidades.
 *
 */

const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
    const { userId: user_id, role: user_role } = req.user;

    try {
        let all_properties;

        if (user_role === "admin") {
            console.log("Admin solicitando información de las propiedades!");
            all_properties = await pool.query("SELECT * FROM properties");
        } else {
            console.log(
                `Usuario con id: ${user_id} solicitando información de las propiedades!`
            );
            all_properties = await pool.query(
                "SELECT * FROM properties WHERE user_id = $1",
                [user_id]
            );
        }

        res.json(all_properties.rows);
    } catch (e) {
        console.log(e);
        res.status(500).send("Error al obtener las propiedades ❌");
    }
});

module.exports = router;