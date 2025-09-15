/**
 * @file /routes/users/index.js
 * @description Enrutador principal para las rutas relacionadas con los usuarios.
 * 
 * Este archivo agrupa y exporta todas las sub-rutas de la API para la gestión de usuarios.
 * Cada sub-ruta se corresponde con una acción específica (insertar, borrar, obtener todos).
 * 
 * - /delete: Gestiona el borrado de usuarios.
 * - /getAll: Gestiona la obtención de todos los usuarios.
 * - /insert: Gestiona la inserción de nuevos usuarios.
 * - /update: Gestiona la actualización de usuarios.
 */

const express = require("express");
const router = express.Router();

router.use("/delete", require("./delete_user_by_id"));
router.use("/getAll", require("./get_all_users"));
router.use("/insert", require("./create_user"));
router.use("/update", require("./update_values"));
router.use("/profile", require("./get_user_profile"));
router.use("/login", require("./login"));

module.exports = router;