/**
 * @file /routes/properties/delete_property.js
 * @description Endpoint para eliminar las propiedades que no queramos.
 *
 * @route POST /property/delete/:id
 * @param {string} req.params.id - El ID de la propiedad que se desea eliminar.
 *
 * @returns {object} 200 - Mensaje de éxito si la propiedad se a eliminado correctamente.
 * @returns {object} 500 - Error si ocurre un problema en el servidor.
 */

const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authMiddleware = require("../../middleware/authMiddleware");

router.delete("/:id", authMiddleware, async (req, res) => {    
    //Id del usuario que queremos eliminar.
    const idToDelete = req.params.id;
    //Id del usuario que está haciendo la petición de eliminación.
    const { userId: user_id, role: user_role } = req.user;

    if(user_role !== 'admin' && user_id.toString() !== idToDelete){
        return res.status(403).json({error: "Acción no permitida. No puedes eliminar a otros usuarios."});
    }
    try {
        const result = await pool.query(
            "DELETE FROM properties WHERE id = $1",
            [idToDelete]
        );

        if(result.rowCount === 0){
            return res.status(404).json({error: "Propiedad no encontrada."});
        }
        res.status(200).json({ mensaje: "Propiedad eliminada correctamente" });
    } catch (err) {
        console.error("Error al eliminar propiedad:", err);
        res.status(500).json({ error: "Error en el servidor al eliminar la propiedad" });
    }
});

module.exports = router;