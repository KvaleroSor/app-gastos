/**
 * @file /routes/properties/update_property.js
 * @description Endpoint para actualizar los datos de una propiedad de forma dinámica y segura.
 *
 * @route POST /property/update/:id
 * @param {string} req.params.id - El ID de la propiedad que se desea actualizar.
 * @param {object} req.body - Un objeto que contiene los campos a actualizar.
 *                          Solo se actualizarán los campos presentes en el objeto.
 *                          Ejemplo: { "name": "Nuevo Nombre", "email": "nuevo@correo.com" }
 *
 * @returns {object} 200 - Mensaje de éxito si la propiedad se actualiza correctamente.
 * @returns {object} 400 - Error si no se proporcionan campos para actualizar.
 * @returns {object} 500 - Error si ocurre un problema en el servidor.
 */

const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/:id", authMiddleware, async (req, res) => {
    //Guardamos en una constante el id de la propiedad a modificar
    const id_property_update = req.params.id;
    const { userId: id_user_property_owner, role: user_role } = req.user;

    //Recogemos todos los valores del cuerpo de la consulta.
    const fields = req.body;

    //Eliminamos los valores que no queremos que se modifiquen.
    delete fields.id;
    delete fields.user_id;

    fields.update_date = new Date();

    const keys = Object.keys(fields);

    if (keys.length === 0) {
        return res
            .status(400)
            .json({ error: "No has proporcionado ningún valor" });
    }

    const set_claus = keys
        .map((key, index) => `"${key}" = $${index + 1}`)
        .join(", ");
    const values = Object.values(fields);

    let query_text = `UPDATE properties SET ${set_claus} WHERE id = $${
        keys.length + 1
    }`;
    const query_params = [...values, id_property_update];

    if (user_role !== "admin") {
        query_text += ` AND user_id = $${keys.length + 2}`;
        query_params.push(id_user_property_owner);
    }

    query_text += " RETURNING *;";

    try {
        const { rows, rowCount } = await pool.query(query_text, query_params);

        if (rowCount === 0) {
            return res
                .status(404)
                .json({
                    error: "Propiedad no encontrada o no tienes permisos para actualizarla",
                });
        }
        res.status(200).json({
            message: "Propiedad actualizada correctamente.",
            property: rows[0],
        });
    
    } catch (err) {
        console.error("Error al actualizar usuario: ", err);
        res.status(500).json({ error: "Error en el servidor al actualizar" });
    }
});

module.exports = router;
