const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * 📝 Anotación
 * 
 * Siempre será la ruta /"nombre del archivo".
 * 
 * Todas las rutas que añadamos a parte de esta, por ejemplo /insertar
 * siempre será /"nombre del archivo"/nombre de la ruta que hayamos confugurado
 * extra dentro de este archivo.
 */
router.get("/", (req, res) => {
    try {
        res.json({ mensaje: "¡Ruta /test funcionando!" });
    } catch (e) {
        console.log(e);
        res.status(500).send("Error al obtener usuarios ❌");
    }
});



module.exports = router;
