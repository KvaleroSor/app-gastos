/**
 * @file /routes/users/delete_user_by_id.js
 * @description Consulta que elimina un usuario basándose en su ID.
 * 
 * Esta consulta es la encargada de eliminar un usurio basándose en su ID,
 * que se pasa como parámetro en la URL (ej: /users/delete/123).
 * 
 */

const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authMiddleware = require('../../middleware/authMiddleware');

router.delete("/:id", authMiddleware, async (req, res) => {    
    //Id del usuario que queremos eliminar.
    const idToDelete = req.params.id;
    //Id del usuario que está haciendo la petición de eliminación.
    const authenticatedUserId = req.user.userId;

    if(authenticatedUserId.toString() !== idToDelete){
        return res.status(403).json({error: "Acción no permitida. No puedes eliminar a otros usuarios."});
    }
    try {
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1",
            [idToDelete]
        );

        if(result.rowCount === 0){
            return res.status(404).json({error: "Usuario no encontrado"});
        }
        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        res.status(500).json({ error: "Error en el servidor al eliminar usuario" });
    }
});

module.exports = router;