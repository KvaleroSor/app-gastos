const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authMiddleware = require('../../middleware/authMiddleware');

/**
 * @route GET /users/profile
 * @description Obtiene los datos del perfil del usuario autenticado.
 * @access Private
 */
router.get("/", authMiddleware, async (req, res) => {
    try {
        // El ID del usuario lo obtenemos del token gracias al middleware
        const userId = req.user.userId;
        const user = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [userId]);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error del servidor");
    }
});

module.exports = router;
