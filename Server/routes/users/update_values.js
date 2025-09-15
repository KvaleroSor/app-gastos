/**
 * @file /routes/users/update_values.js
 * @description Endpoint para actualizar los datos de un usuario de forma dinámica y segura.
 * 
 * @route POST /users/update/:id
 * @param {string} req.params.id - El ID del usuario que se desea actualizar.
 * @param {object} req.body - Un objeto que contiene los campos a actualizar. 
 *                          Solo se actualizarán los campos presentes en el objeto.
 *                          Ejemplo: { "name": "Nuevo Nombre", "email": "nuevo@correo.com" }
 * 
 * @returns {object} 200 - Mensaje de éxito si el usuario se actualiza correctamente.
 * @returns {object} 400 - Error si no se proporcionan campos para actualizar.
 * @returns {object} 500 - Error si ocurre un problema en el servidor.
 */

const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authMiddleware = require('../../middleware/authMiddleware');

router.post("/:id", authMiddleware, async (req, res) => {
    //Guardamos en una constante el id del usuario a modificar
    const id_user_update = req.params.id;
    //Id del usuario que está haciendo la petición de modificación.
    const { userId: authenticationUserId, role: user_role } = req.user;

    if(user_role !== 'admin' && authenticationUserId.toString() !== id_user_update){
        return res.status(403).json({error: "Acción no permitida. No puedes modificar a otros usuarios."});
    }

    const fields = req.body;
    const update_fields = [];
    const values = [];
    let counter = 1;

    for (const key in fields) {
        if (fields[key] !== undefined && fields[key] !== null && fields[key] !== '') {
            update_fields.push(`${key} = $${counter}`);
            values.push(fields[key]);
            counter++;
        }
    }

    if (update_fields.length === 0) {
        return res.status(400).json({ error: "No hay campos válidos para actualizar" });
    }

    // Añadimos el id al final del array de valores para el WHERE
    values.push(id_user_update);

    // Construimos la consulta final de forma segura
    const query = `UPDATE users SET ${update_fields.join(', ')} WHERE id = $${counter}`;

    try {
        await pool.query(query, values);
        res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
        res.status(500).json({ error: "Error en el servidor al actualizar usuario" });
    }
});

module.exports = router;