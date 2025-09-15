const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const saltRound = 10;
    const { name, email, password } = req.body;
    const password_hash = await bcrypt.hash(password, saltRound);
    
    try {
        await pool.query(
            "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)",
            [name, email, password_hash]
        );
        res.status(201).json({ mensaje: "Usuario introducido correctamente" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al insertar usuario" });
    }
});

module.exports = router;