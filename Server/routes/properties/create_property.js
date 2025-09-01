const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcrypt");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
    const { name, direction, city, comunity, postal_code, purchase_price } =
        req.body;

    const user_id = req.user.userId;

    if (
        !name ||
        !direction ||
        !city ||
        !comunity ||
        !postal_code ||
        !purchase_price
    ) {
        return res.status(400).json({
            mensaje: "Faltan campos obligatorios por rellenar",
        });
    }

    /**
     * PROBLEMAS A SOLUCIONAR 🔴
     * 
     * 1- Problema con la introducción del número de código postal.
     *    
     *    Si se introduce un "0" como primer valor del número en cuestión
     *    no lo da como valor valido.
     */

    try {
        const new_property = await pool.query(
            "INSERT INTO properties (name, direction, city, comunity, postal_code, purchase_price, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
                name,
                direction,
                city,
                comunity,
                postal_code,
                purchase_price,
                user_id,
            ]
        );
        res.status(201).json({
            mensaje: "Propiedad creada correctamente",
            property: new_property.rows[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al insertar la propiedad" });
    }
});

module.exports = router;
