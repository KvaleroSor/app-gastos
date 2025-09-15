const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.post("/", async (req, res) => {
    const { name, email, password_hash } = req.body;
    try {
        await pool.query(
            "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)",
            [name, email, password_hash]
        );
        res.status(201).json({ mensaje: "Usuario insertado correctamente" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al insertar usuario" });
    }
});

module.exports = router;
